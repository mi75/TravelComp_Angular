var http = require('http');
var fs = require('fs');
var dbOperations = require('./dbOperations');


//create a server object:
http.createServer(function(req, res) {
    var headers = { 'Test-Header': 'Test' };

    try {

        if (req.method == 'GET') {
            processGetRequest(req, res);
        } else {
            if (req.method == 'POST') {
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
                                console.log(err);
                                returnError(err, res, headers);
                            } // else {
                            //     res.writeHead(301, { Location: '/contacts' });
                            //     res.end();
                            // }
                        }));
                        // var result = dbOperations.addContact(contact);
                        res.writeHead(301, { Location: '/contacts' });
                        res.end();
                    }
                });
            }
        }
    } catch (err) {
        returnError('Exception occured', res, headers);
        throw err;
    }

}).listen(8080);

function returnError(errorMessage, response, headers) {
    response.writeHead(500, headers);
    response.write(errorMessage);
    response.end();
}

function processGetRequest(req, res) {

    var targetFileName;
    var useLayout = false;
    var useAdmin = false;
    switch (req.url) {
        case '/':
            {
                targetFileName = __dirname + '/index.html';
                useLayout = true;
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
                useAdmin = true;
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
            if (useAdmin) {
                dbOperations.readTable(function(result) {
                    var list = 'No database connection...(';
                    if (result) list = JSON.stringify(result);
                    var tableData = data.toString('UTF8');
                    var tableBody = tableData.replace("@renderTab", list);
                    res.write(tableBody);
                    res.end();
                })


            } else {
                res.write(data);
                res.end();
            }
        }
    } else {
        res.writeHead(404);
        res.write('Not found');
        res.end();
    }
}