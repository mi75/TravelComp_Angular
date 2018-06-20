var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");

var dbOperations = require('../dbOperations');
var url = require("url");


var serverApp = express();
serverApp.use(cors());

// serverApp.get("/", function processGetRequest(req, res) {
//     var targetFileName = '../src/app/app.component.html';
//     var data = fs.readFileSync(targetFileName);
//     res.send(data);
// });

// var serveRouter = express.Router();
// serveRouter.route("/")
//     .get(function processGetRequest(req, res) {
//         res.send('ADMIN OK');
//     });
// serverApp.use("/admin", serveRouter);

var jsonParser = bodyParser.json();
serverApp.use("/api", express.static("../src/app/contacts-page"));
serverApp.post("/contacts", jsonParser, function(req, res) {
    // if (req.method == 'OPTIONS') {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', '*');
    //     res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    //     res.end();
    //     return;
    // }
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
});


serverApp.get("/api/admin", function(req, res) {
    dbOperations.readContacts(function(err, result) {
        if (err) {
            returnError(err.sqlMessage, res);
        } else {
            var list = '';
            if (result) list = JSON.stringify(result);
            res.write(list);
            res.end();
        }
    });
});

serverApp.get("/api/feedback", function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var startRow = parseInt(query.startRow);
    dbOperations.readFeedback(startRow, function(err, result) {
        if (err) {
            returnError(err.sqlMessage, res);
        } else {
            var list = '';
            if (result) list = JSON.stringify(result);
            res.write(list);
            res.end();
        }
    });
});

serverApp.get("/:targetFileName", function(req, res) {
    var ttt = req.params["targetFileName"];
    console.log(`Запрошенный файл: ${ttt}`);
    // var targetFileName = __dirname + req.url;
    if (fs.existsSync(targetFileName)) {
        var data = fs.readFileSync(targetFileName);
        res.writeHead(200, {});
        res.write(data);
        res.end();
    } else {
        res.writeHead(404);
        res.write('Not found');
        res.end();
    }
});

serverApp.listen(3000);