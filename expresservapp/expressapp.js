var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
var multer = require('multer'); // for processing of files from forms
var upload = multer({ dest: __dirname + '/../src/assets/images/upload/' });
var picsForSlider = multer({ dest: __dirname + '/../src/assets/images/bodycmp/' });
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require('express-session');
var bcrypt = require('bcrypt');

var dbOperations = require('../dbOperations');


var serverApp = express();
serverApp.use(cors({origin: 'http://127.0.0.1:4200', credentials: true}));

serverApp.use(session({ secret: 'some secret', cookie: { maxAge: 2592000000, domain:"127.0.0.1" }}));
serverApp.use(passport.initialize());
serverApp.use(passport.session());

var jsonParser = bodyParser.json();

var apiRouter = express.Router();

// const saltRounds = 10
// const myPlaintextPassword = 'qwerty'
// const salt = bcrypt.genSaltSync(saltRounds)
// const salt = '$2b$10$eqEdU1OpxwhwAbgIeyip2.'
// const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)

//Plain text
var user = {
    username: '',
    passwordFromDB: '',
    salt: '',
    id: ''
}

//O@#RJOKLJElrkU*ASLKDJLKJ!LK@J!@E!@)E!@E)KSALDJLAKSJDLKjlkjLMN<#(@)()*$&YU(#!IOJK)

//Регистрация
//1. Пользователь открывает страничку в бр-ре, вводит свой логин-пароль, нажимает "отправить"
//2. Сервер получает запрос, создаёт запись в таблице "Пользователи" вида -  логин:логин , пароль: хеш (пароля),
// генерирует соль, и в открытом виде сохраняет её в базе, применив до этого к паролю
//3. Создаётся сессия, браузеру отправляется куки (как правило), пользователь залогинен
//Польз. вышел

// Вход в систему:
// Ползователь отправляет форму со своим логином-паролем
// Сервер вытаскивает по логну объект пользователя из БД
// После этого на тот пароль что прислал пользватель (плюс соль) наклывадется хеш-ф-ия, и свранивается с тем что лежит в БД
// Если они совпадают, то всё ок


// Пользователь:
//Имя - Емейл - Пароль - Соль
//Stas - stas@gmail.com - jkwehfk(*@#&()) - j39f02j

var findUser = function(username, cb) {
    dbOperations.readAdminUser(username, function(err, result) {
        if (err) {
            return err.sqlMessage;
        } else {
            if (result) user = {salt: result[0].salt, passwordFromDB: result[0].password};
            return cb(null, user);
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
        process.nextTick(findUser);
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user.salt);   // req.session.passport.user
  });
  
passport.deserializeUser(function(id, cb) {
    cb(null, user)       // from database to req.user
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
    .post(picsForSlider.single('picture'), function(req, res) { // multer's method

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
    .post(picsForSlider.single('picture'), function(req, res) { // multer's method

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
    .post(picsForSlider.single('picture'), function(req, res) { // multer's method

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
    .post(picsForSlider.single('picture'), function(req, res) { // multer's method

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

apiRouter.route("/images")
    .get(function(req, res) {
        
        var targetFileName = __dirname + ( req.query.useBodyPath ? "/../src/assets/images/bodycmp/" : "/../src/assets/images/upload/")  + req.query.id;

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