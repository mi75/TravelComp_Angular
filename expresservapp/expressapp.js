var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
var Busboy = require('busboy');
var uuidv4 = require('uuid-v4');

var dbOperations = require('../dbOperations');


var serverApp = express();
serverApp.use(cors());

var jsonParser = bodyParser.json();

var apiRouter = express.Router();

apiRouter.route("/contacts")
    .post(jsonParser, function(req, res) {
        if (!req.body) return res.sendStatus(400);
        var postData = req.body;
        var contact = {
            message: postData.message,
            name: postData.from,
            email: postData.mail,
            telephone: postData.phone,
            howHeard: postData.how,
            keepMe: postData.cb == true ? 1 : 0
        };
        dbOperations.addContact(contact, (function(err) {
            if (err) {
                res.status(501);
                res.send(err.sqlMessage);
            } else {
                res.status(200, {});
            }
        }));
    });

apiRouter.route("/admin")
    .get(function(req, res) {
        dbOperations.readContacts(function(err, result) {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                var list = '';
                if (result) list = JSON.stringify(result);
                res.send(list);
            }
        });
    });

apiRouter.route("/feedback")
    .post(jsonParser, function(req, res) {
        var photoName = uuidv4();
        var name;
        var message;
        var userFile = '';
        var busboy = new Busboy({ headers: req.headers });
        req.pipe(busboy);

        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            if (filename) { userFile = filename };
            var saveTo = __dirname + '/../src/assets/images/upload/' + photoName;
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
                    res.status(501);
                    res.send(err.sqlMessage);
                } else {
                    res.writeHead(200);
                    res.end();
                }
            }));
        });
    });

apiRouter.route("/feedback")
    .get(function(req, res) {
        var startRow = parseInt(req.query.startRow);
        dbOperations.readFeedback(startRow, function(err, result) {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                var list = '';
                if (result) list = JSON.stringify(result);
                res.send(list);
            }
        });
    });

apiRouter.route("/images")
    .get(function(req, res) {
        var targetFileName = __dirname + "/../src/assets/images/upload/" + req.query.id;
        if (fs.existsSync(targetFileName)) {
            var data = fs.readFileSync(targetFileName);
            res.status(200, {});
            res.send(data);
        } else {
            res.status(404);
            res.send('Not found');
        }
    });

serverApp.use("/api", apiRouter);

serverApp.listen(3000);