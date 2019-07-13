var express = require("express");
var requestify = require("requestify");
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
var multer = require('multer'); // for processing of files from forms
var aws = require('aws-sdk');
var uuidv1 = require('uuid/v1');

var s3 = new aws.S3();
var multerS3 = require('multer-s3');

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'turcomp.angular.bucket',
        key: function (req, file, cb) {

            file.filename = uuidv1();

            var fullPath;
            if (req.path == '/feedback'){
                fullPath = 'assets/images/upload/' + file.filename;
            } else {
                fullPath = 'assets/images/bodycmp/' + file.filename;
            }
            cb(null, fullPath);
        }
      }) 
    });

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require('express-session');
var bcrypt = require('bcrypt');

var dbOperations = require('../mandryDbOperations');

var siteBucketAddr = 'http://turcomp.angular.bucket.s3-website.eu-central-1.amazonaws.com';

var instagramUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';
var instagramAccessToken = '10020038878.4afaaab.906ecf00671c455994ee75571984a1f1';


var apiRouter = express.Router();
var serverApp = express();
serverApp.use(cors({origin: 'http://127.0.0.1:4200', credentials: true}));

serverApp.use(session({ secret: 'some secret', cookie: { maxAge: 2592000000, domain:"d32y8hei1lnlri.cloudfront.net"}, resave: true,
saveUninitialized: true }));

serverApp.use(passport.initialize());
serverApp.use(passport.session());

var jsonParser = bodyParser.json();



var nocache = function(req, res, next) {
    console.log('No cache!');
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

var findUser = function(username, cb) {
    dbOperations.readAdminUser(username, function(err, result) {
        if (err) {
            return err.sqlMessage;
        } else {
            if (!result[0]) {
                return cb(null, null);
            } else {
                user = {id: result[0].id, salt: result[0].salt, passwordFromDB: result[0].password};
                return cb(null, user);
            }
        }
    });
}

passport.use('local', new LocalStrategy(
    function(username, password, done) {
        findUser(username, function (err, user) {
            if (!user) {
                return done(null, false);
            } else {
                let salt = user.salt;
                passwordHash = bcrypt.hashSync(password, salt);
                if (passwordHash !== user.passwordFromDB ) {
                    return done(null, false);
                } else {
                    return done(null, user);
                }    
            }
        })
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);   // req.session.passport.user
  });
  
passport.deserializeUser(function(id, cb) {
    cb(null, id);       // from database to req.user
  });

apiRouter.all("/admin/*", function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401);
        res.end();
    }
})

apiRouter.post("/logout", function(req, res) {
    req.logout();
    req.session.destroy(()=>res.end());
})

apiRouter.route("/login")
    .post(jsonParser,  passport.authenticate('local'), function(req, res) {
        res.end();
    });

apiRouter.route("/admin/tripsFeatures")
    .get(function(req, res) {
        dbOperations.readTripFeaturesTable(function(err, result) {
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

apiRouter.route("/trips/allDisplayingTrips")
    .get(function(req, res) {
        dbOperations.readOnAllTripsPage(function(err, result) {
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

apiRouter.route("/trips/display")
    .get(function(req, res) {
        dbOperations.readTripsOnSlider(function(err, result) {
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

apiRouter.route("/admin/allTrips")
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

apiRouter.route("/trips/popular")
    .get(function(req, res) {
        dbOperations.readPopularTrips(function(err, result) {
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

apiRouter.route("/trips/tourPage")
    .get(function(req, res) {
        var tripId = parseInt(req.query.tripId);
        dbOperations.readTripToPage(tripId, function(err, result) {
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

apiRouter.route("/admin/deleteTrip")
    .post(jsonParser, function(req, res) {
        let dateOfDel =  new Date();
        dbOperations.delTrip(req.body.id, dateOfDel, function(err) {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.writeHead(200);
                res.end();
            }
        });
    });

apiRouter.route("/admin/delTripsFeature")
    .post(jsonParser, function(req, res) {
        let dateOfDel =  new Date();
        dbOperations.delFeature(req.body.id, dateOfDel, function(err) {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.writeHead(200);
                res.end();
            }
        });
    });

apiRouter.route("/admin/createTrip")
    .post(upload.single('picture'), function(req, res) { // multer's method

        var trip = {
            title: req.body.title,
            fullTripName: req.body.fullTripName,
            picName: (!req.file) ? null : req.file.originalname,
            picFile: (!req.file) ? null : req.file.filename,
            onCommon: req.body.onCommon == 'true' ? 1 : 0,
            onSlider: req.body.onSlider == 'true' ? 1 : 0,
            onPopular: req.body.onPopular == 'true' ? 1 : 0,
            startDate: req.body.startDate,
            finishDate: req.body.finishDate,
            price: req.body.price,
            characteristics: req.body.characteristics,
            notInclude: req.body.notInclude,
            program: req.body.program
        };

        var featureIds = req.body.featureIds.split(',');

        dbOperations.createTrip(trip, featureIds, (function(err) {
        if (err) {
            res.status(501);
            res.send(err.sqlMessage);
        } else {
            res.writeHead(200);
            res.end();
        }
        }));
    });

apiRouter.route("/admin/createTripsFeature")
    .post(upload.single('picture'), function(req, res) { // multer's method

        var feature = {
            description: req.body.featureName,
            pic: (!req.file) ? null : req.file.filename
        };

        dbOperations.createTripsFeature(feature, (function(err) {
        if (err) {
            res.status(501);
            res.send(err.sqlMessage);
        } else {
            res.writeHead(200);
            res.end();
        }
        }));
    });

apiRouter.route("/admin/editTripsFeature")
    .post(upload.single('picture'), function(req, res) { // multer's method

        var feature = {
            description: req.body.featureName
        };

        if (req.file){
            feature.pic = req.file.filename;
        }

        var featureId = req.body.id;

        dbOperations.updateTripsFeature(feature, featureId, (function(err) {
        if (err) {
            res.status(501);
            res.send(err.sqlMessage);
        } else {
            res.writeHead(200);
            res.end();
        }
        }));
    });

apiRouter.route("/admin/editTrip")
    .post(upload.single('picture'), function(req, res) { // multer's method

        var trip = {
            title: req.body.title,
            fullTripName: req.body.fullTripName,
            onCommon: req.body.onCommon == 'true' ? 1 : 0,
            onSlider: req.body.onSlider == 'true' ? 1 : 0,
            onPopular: req.body.onPopular == 'true' ? 1 : 0,
            startDate: req.body.startDate,
            finishDate: req.body.finishDate,
            price: req.body.price,
            characteristics: req.body.characteristics,
            notInclude: req.body.notInclude,
            program: req.body.program
        };

        if (req.file){
            trip.picFile = req.file.filename;
            trip.picName =  req.file.originalname;
        }        

        var editTripId = req.body.id;
        var featureIds = req.body.featureIds.split(',');

        dbOperations.updateTrip(trip, editTripId, featureIds, (function(err) {
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
        dbOperations.createContact(contact, (function(err) {
            if (err) {
                res.status(501);
                res.send(err.sqlMessage);
            } else {
                res.status(200, {});
            }
        }));
    });

apiRouter.route("/admin/adminStart")
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

        dbOperations.createFeedback(contact, (function(err) {
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

apiRouter.route("/admin/allFeedbacks")
    .get(function(req, res) {
        dbOperations.readFeedbacksForAdmin(function(err, result) {
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

apiRouter.route("/admin/delFeedback")
    .post(jsonParser, function(req, res) {
        let dateOfDel =  new Date();
        dbOperations.delFeedback(req.body.id, dateOfDel, function(err) {
            if (err) {
                res.status(500);
                res.send(err.sqlMessage);
            } else {
                res.writeHead(200);
                res.end();
            }
        });
    });

apiRouter.route("/picsFromInstagram")
    .get(nocache, function(req, res) {
        var instaPicsUrls = [];
        requestify.request(instagramUrl+instagramAccessToken, {
            method: 'GET',
            headers: {
                'cache-control': 'private, no-cache, no-store, must-revalidate',
                'Expires': '-1',
                'Pragma': 'no-cache'
            }
        })
        .then(function(response) {
            let instaDataArr = response.getBody().data;
            instaDataArr.forEach(function(item) {
                instaPicsUrls.push(item.images.standard_resolution.url);
            });
            res.header('cache-control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            res.send(instaPicsUrls);
        })
        .fail(function(response) {
            res.status(404);
            res.send('No Instagram Connection:' + response.getCode());
        });
    });

apiRouter.route("/images")
    .get(function(req, res) {
        var targetFileName = siteBucketAddr + ( req.query.useBodyPath ? '/assets/images/bodycmp/' : '/assets/images/upload/') + req.query.id;
        res.writeHead(302, {'Location': targetFileName});
        res.end();
    });

serverApp.use("/api", apiRouter);

serverApp.listen(3000, function() {console.log('Server running on port 3000'); });