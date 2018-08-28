var mysql = require('mysql');

// create a MySQL DB connection:
var connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'db_1',
    user: 'root',
    password: 'casiopilot16!'
});

connection.connect(function(err) {
    if (err) {
        console.log(err);
    }
});

module.exports = {
    addContact: function(contact, callback) {
        connection.query('INSERT INTO contacts_1 SET ?', contact, function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    },

    addFeedback: function(contact, callback) {
        connection.query('INSERT INTO feedback_1 SET ?', contact, function(err, result) {
            if (err) {
                callback(err);
            } else {
                callback();
            }
        });
    },

    readContacts: function(callback) {
        connection.query('SELECT * FROM contacts_1', function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },

    readFeedback: function(startRow, callback) {

        var count;

        connection.query('SELECT COUNT(*) as count FROM feedback_1', function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                count = result[0].count;
            }
        });

        connection.query('SELECT * FROM feedback_1 ORDER BY date DESC LIMIT ?, 3', startRow, function(err, result) {
            var dataModel;
            if (err) {
                callback(err, null);
            } else {
                dataModel = {
                    rows: result,
                    count: count
                }
                callback(null, dataModel);
            }
        });
    },

    readTripFeaturesTable: function(callback) {
        connection.query('SELECT * FROM trip_features_1', function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },

    readTripsOnMainPage: function(callback) {
        connection.query('SELECT id, title, picFile FROM trips_1 WHERE (`onMain` = "1") ORDER BY id DESC', function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },

    readTripsForAdmin: function(callback) {
        connection.query('SELECT trips_1.*, GROUP_CONCAT(trip_features_1.description) AS features, GROUP_CONCAT(trip_features_1.id) AS selectedFeatures\
                        FROM trips_1 JOIN trips_trip_features_1 ON trips_1.id=trips_trip_features_1.trip_id\
                        JOIN trip_features_1 ON trips_trip_features_1.feature_id=trip_features_1.id\
                        GROUP BY trips_1.id', function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },

    readTripForEdit: function(editRowId, callback) {
        connection.query('SELECT trips_1.*, GROUP_CONCAT(trip_features_1.id) AS features\
                        FROM trips_1 JOIN trips_trip_features_1 ON trips_1.id=trips_trip_features_1.trip_id\
                        JOIN trip_features_1 ON trips_trip_features_1.feature_id=trip_features_1.id WHERE trips_1.id = ?\
                        GROUP BY trips_1.id', editRowId, function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },

    writeTripAfterEdit: function(trip, editTripId, featureIds, callback) {
        let featureId;
        connection.query('UPDATE trips_1 SET ? WHERE id = ?', [trip, editTripId], function(err, result) {
            if (err) {
                callback(err);
            }
        });
        connection.query('DELETE FROM trips_trip_features_1 WHERE (`trip_id` = ?);', editTripId, function(err, result) {
            if (err) {
                callback(err);
            }  else {
                var valuesToInsert = [];

                for (let i=0; i<featureIds.length; i++) {
                   featureId = featureIds[i];
                   var arrayToPush = [];
                   arrayToPush.push(editTripId);
                   arrayToPush.push(featureId);
                   valuesToInsert.push(arrayToPush);
               }

               connection.query('INSERT INTO trips_trip_features_1 (`trip_id`, `feature_id`) VALUES ?', [valuesToInsert], function(err, result) {
               if (err) {
                 callback(err);
               } else{
                   callback();
               }
           });
           }
        });
    },

    delTrip: function(delRowId, callback) {
        connection.query('DELETE FROM trips_trip_features_1 WHERE (`trip_id` = ?);', delRowId, function(err, result) {
            if (err) {
                callback(err);
            } else {
                connection.query('DELETE FROM trips_1 WHERE id = ?', delRowId, function(err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
            }
        });
    },

    addTrip: function(trip, featureIds, callback) {
        var featureId;
        connection.query('INSERT INTO trips_1 SET ?', trip, function(err, result) {
            if (err) {
                callback(err);
            }  else {
                 var tripId = result.insertId; // new trip's id
                 var valuesToInsert = [];

                 for (let i=0; i<featureIds.length; i++) {
                    featureId = featureIds[i];
                    var arrayToPush = [];
                    arrayToPush.push(tripId);
                    arrayToPush.push(featureId);
                    valuesToInsert.push(arrayToPush);
                }

                connection.query('INSERT INTO trips_trip_features_1 (`trip_id`, `feature_id`) VALUES ?', [valuesToInsert], function(err, result) {
                if (err) {
                  callback(err);
                } else{
                    callback();
                }
            });
            }
        });
    }
}

// insertion's data: console.log(query.sql);