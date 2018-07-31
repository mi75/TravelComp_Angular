var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
var multer = require('multer'); // for processing of files from forms
var upload = multer({ dest: __dirname + '/../src/assets/images/upload/' });
var picsForSlider = multer({ dest: __dirname + '/../src/assets/images/bodycmp/' });


var dbOperations = require('../dbOperations');


var serverApp = express();
serverApp.use(cors());

var jsonParser = bodyParser.json();

var apiRouter = express.Router();

apiRouter.route("/trips/display")
    .get(function(req, res) {
        dbOperations.readTripsOnMainPage(function(err, result) {
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

apiRouter.route("/trips/all")
    .get(function(req, res) {
        dbOperations.readTripsForAdmin(function(err, result) {
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

apiRouter.route("/trips/edit")
    .get(function(req, res) {
        var editRowId = parseInt(req.query.rowId);
        dbOperations.readTripForEdit(editRowId, function(err, result) {
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

apiRouter.route("/trips/delete")
    .post(function(req, res) {
        var delRowId = parseInt(req.query.rowId);
        dbOperations.delTrip(delRowId, function(err) {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.writeHead(200);
                res.end();
            }
        });
    });

apiRouter.route("/trips/create")
    .post(picsForSlider.single('picture'), function(req, res) { // multer's method

        var trip = {
            title: req.body.title,
            picName: (!req.file) ? null : req.file.originalname,
            picFile: (!req.file) ? null : req.file.filename,
            onMain: req.body.displ == 'true' ? 1 : 0,
            startDate: req.body.start,
            finishDate: req.body.finish,
            price: req.body.price,
            characteristics: req.body.characteristics,
            program: req.body.program
        };

        var featureIds = req.query.featureIds.split(',');

        dbOperations.addTrip(trip, featureIds, (function(err) {
        if (err) {
            res.status(501);
            res.send(err.sqlMessage);
        } else {
            res.writeHead(200);
            res.end();
        }
        }));
    });

apiRouter.route("/trips/edit")
    .post(picsForSlider.single('picture'), function(req, res) { // multer's method

        var trip = {
            title: req.body.title,
            picName: (!req.file) ? null : req.file.originalname,
            picFile: (!req.file) ? null : req.file.filename,
            onMain: req.body.displ == 'true' ? 1 : 0,
            startDate: req.body.start,
            finishDate: req.body.finish,
            price: req.body.price,
            characteristics: req.body.characteristics,
            program: req.body.program
        };

        var editTripId = parseInt(req.query.rowId);
        var featureIds = req.query.featureIds.split(',');

        dbOperations.writeTripAfterEdit(trip, editTripId, featureIds, (function(err) {
        if (err) {
            res.status(501);
            res.send(err.sqlMessage);
        } else {
            res.writeHead(200);
            res.end();
        }
        }));
    });

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
    .post(upload.single('photo'), function(req, res) { // multer's method

        var contact = {
            message: req.body.message,
            name: req.body.from,
            photo: (!req.file) ? null : req.file.filename,
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