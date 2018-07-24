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
        connection.query('SELECT trips_1.*, GROUP_CONCAT(trip_features_1.Description) AS features\
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
        connection.query('SELECT trips_1.*, GROUP_CONCAT(trip_features_1.Description) AS features\
                        FROM trips_1 JOIN trips_trip_features_1 ON trips_1.id=trips_trip_features_1.trip_id\
                        JOIN trip_features_1 ON trips_trip_features_1.feature_id=trip_features_1.id WHERE trips_1.id = ?\
                        GROUP BY trips_1.id', editRowId, function(err, result1) {
            if (err) {
                callback(err, null);
            } else {
                connection.query('SELECT feature_id FROM trips_trip_features_1 WHERE (`trip_id` = ?);', editRowId, function(err, result2) {
                    if (err) {
                        callback(err, null);
                    } else {
                        let result = JSON.stringify(result1) + JSON.stringify(result2);
                        callback(null, result);
                    }
                });
                // callback(null, result);
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
            }
        });
        for (let i=0; i<featureIds.length; i++) {
            featureId = featureIds[i];
            connection.query('INSERT INTO trips_trip_features_1 (`trip_id`, `feature_id`) VALUES (?, ?);', [editTripId, featureId], function(err, result) {
                if (err) {
                  callback(err);
                }
            });
        }
        callback();
    },

    delTrip: function(delRowId, callback) {
        connection.query('DELETE FROM trips_trip_features_1 WHERE (`trip_id` = ?);', delRowId, function(err, result) {
            if (err) {
                callback(err);
            }
        });
        connection.query('DELETE FROM trips_1 WHERE id = ?', delRowId, function(err, result) {
            if (err) {
                callback(err);
            }
        });
        connection.query('SELECT trips_1.*, GROUP_CONCAT(trip_features_1.Description) AS features\
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

    addTrip: function(trip, featureIds, callback) {
        var newTripId=0;
        var featureId;
        connection.query('INSERT INTO trips_1 SET ?', trip, function(err, result) {
            if (err) {
                callback(err);
            } // else {
            //     console.log(trip.title);
            //     callback();
            // }
        });
        connection.query('SELECT id FROM trips_1 WHERE (`title` = ?);', trip.title, function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                newTripId = result[0].id;
                console.log(newTripId);
            }
        });
        console.log(newTripId);
        for (let i=0; i<featureIds.length; i++) {
            featureId = featureIds[i];
            // console.log(newTripId);
            // connection.query('INSERT INTO trips_trip_features_1 (`trip_id`, `feature_id`) VALUES (?, ?);', [newTripId, featureId], function(err, result) {
            //     if (err) {
            //       callback(err);
            //     }
            // });
        }
        callback();
    }
}

// insertion's data: console.log(query.sql);