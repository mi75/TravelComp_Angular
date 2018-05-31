var http = require('http');
var fs = require('fs');
var dbOperations = require('./dbOperations');
var uuidv4 = require('uuid-v4');
var url = require('url');
var Busboy = require('busboy');

//create a server object:
http.createServer(function(req, res) {
    var headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'origin, content-type, accept'
    };

    try {
        if (req.method == 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.end();
            return;
        }

        if (req.method == 'GET') {
            processGetRequest(req, res);
        } else {
            if (req.method == 'POST') {
                if (req.url == '/api/feedback') {

                    var photoName = uuidv4();
                    var name;
                    var message;
                    var userFile = '';
                    var busboy = new Busboy({ headers: req.headers });
                    req.pipe(busboy);

                    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
                        if (filename) { userFile = filename };
                        var saveTo = __dirname + '/src/assets/images/upload/' + photoName;
                        // var saveTo = __dirname + '/../upload/' + photoName;
                        file.pipe(fs.createWriteStream(saveTo));
                    });

                    busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
                        key == 'message' ? message = value : name = value;
                    });

                    busboy.on('finish', function() {

                        var contact = {
                            message: message,
                            name: name,
                            photo: userFile == '' ? null : photoName,
                            date: new Date()
                        };

                        dbOperations.addFeedback(contact, (function(err) {
                            if (err) {
                                returnError(err.sqlMessage, res, headers);
                            } else {
                                // var rapidData = JSON.stringify({ feedbackPhotoName: contact.photo });
                                // returnSuccess('/', res, headers, rapidData);
                                returnSuccess('/', res, headers);
                            }
                        }));
                    });
                } else {
                    var body = '';
                    var postData;
                    req.on('data', function(data) {
                        body += data;
                    });
                    req.on('end', function() {
                        postData = JSON.parse(body);

                        if (req.url == '/api/contacts') {
                            // data from contacts form: console.log(postData);
                            var contact = {
                                message: postData.message,
                                name: postData.from,
                                email: postData.mail,
                                telephone: postData.phone,
                                howHeard: postData.how,
                                keepMe: postData.cb == null ? 0 : 1
                            };
                            dbOperations.addContact(contact, (function(err) {
                                if (err) {
                                    returnError(err.sqlMessage, res, headers);
                                } else {
                                    returnSuccess('/contacts', res, headers);
                                }
                            }));
                        } else {
                            returnError('Unsupported url', res, headers);
                        }
                    });
                }
            }
        }
    } catch (err) {
        returnError('Exception occured', res, headers);
        throw err;
    }

}).listen(8080);

// function returnSuccess(location, response, headers, data) {
function returnSuccess(location, response, headers) {
    response.writeHead(200, headers);
    // response.end(data);
    response.end();
}

function returnError(errorMessage, response, headers) {
    response.writeHead(500, headers);
    response.write(errorMessage);
    response.end();
}

function processGetRequest(req, res) {

    var targetFileName;
    var useLayout = false;
    var useApi = false;

    if (req.url.includes('api/')) {
        useApi = true;
    } else {
        switch (req.url) {
            case '/':
                {
                    targetFileName = __dirname + '/src/app/app.component.html';
                    // useLayout = true;
                    break;
                }
            case '/contacts':
                {
                    targetFileName = __dirname + '/contact_page.html';
                    useLayout = true;
                    break;
                }
            case '/admin':
                {
                    targetFileName = __dirname + '/admin.html';
                    useLayout = true;
                    break;
                }
            case '/favicon.ico':
                {
                    targetFileName = __dirname + '/img/t.png';
                    break;
                }
            default:
                {
                    targetFileName = __dirname + req.url;
                }
        }
    }

    if (useApi) {
        if (req.url.includes('api/feedback')) {
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;
            var startRow = parseInt(query.startRow);
            dbOperations.readFeedback(startRow, function(err, result) {
                if (err) {
                    returnError(err.sqlMessage, res);
                } else {
                    var list = '';
                    if (result) list = JSON.stringify(result);
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                    res.write(list);
                    res.end();
                }
            });
        } else {
            dbOperations.readTable(function(err, result) {
                if (err) {
                    returnError(err.sqlMessage, res);
                } else {
                    var list = '';
                    if (result) list = JSON.stringify(result);
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                    res.write(list);
                    res.end();
                }
            });
        }
    } else {
        if (fs.existsSync(targetFileName)) {

            var data = fs.readFileSync(targetFileName);

            res.writeHead(200, {});

            if (useLayout) { //support of partial HTML files
                var headerFileName = __dirname + '/header.html';
                var footerFileName = __dirname + '/footer.html';
                var layoutFileName = __dirname + '/layout.html';

                var header = fs.readFileSync(headerFileName);
                var footer = fs.readFileSync(footerFileName);
                var layout = fs.readFileSync(layoutFileName);

                var textBody = data.toString('UTF8');
                var bodyScripts = textBody.match(/@scripts.*\{([\s\S]*?)\}/m);
                textBody = textBody.replace(/@scripts.*\{([\s\S]*?)\}/m, '');

                var textData = layout.toString('UTF8');
                textData = textData.replace("@scripts", bodyScripts[1]);

                textData = textData.replace("@renderHeader", header.toString('UTF8'));
                textData = textData.replace("@renderBody", textBody);
                textData = textData.replace("@renderFooter", footer.toString('UTF8'));

                res.write(textData);
                res.end();

            } else {
                res.write(data);
                res.end();
            }

        } else {
            res.writeHead(404);
            res.write('Not found');
            res.end();
        }
    }
}