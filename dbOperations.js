var http = require('http');
var fs = require('fs');
var mysql = require('mysql');

// create a MySQL DB connection:
var connection = mysql.createConnection({
    host: '127.0.0.1',
    database: 'db_1',
    user: 'root',
    password: 'manager'
});

connection.connect(function(err) {
    if (err) {
        console.log(err);
    }
});

module.exports = {
    addContact: function(contact, callback) {
        connection.query('INSERT INTO form_1 SET ?', contact, function(err, result) {
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

    readTable: function(callback) {
        connection.query('SELECT * FROM form_1', function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },

    readFeedback: function(callback) {
        connection.query('SELECT * FROM feedback_1 ORDER BY date DESC LIMIT 3', function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

// insertion's data: console.log(query.sql);