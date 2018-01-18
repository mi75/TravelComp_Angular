var http = require('http');
var fs = require('fs');
var mysql = require('C:/Users/Content/AppData/Roaming/npm/node_modules/mysql');


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
    addContact: function(contact) {
        var query = connection.query('INSERT INTO form_1 SET ?', contact, function(err, result) {
            if (err) {
                console.log(err);
            }
        });
    },
    // addContact: function(contact, callback) {
    //     connection.query('INSERT INTO form_91 SET ?', contact, function(err, result) {
    //         if (err) {
    //             callback(err);
    //         }
    //     });
    // },

    // readTable: function() {
    //     var data = "";
    //     connection.query('SELECT * FROM form_1', function(err, result) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             data = result;
    //             console.log(data);
    //         }
    //     });
    //     return data;
    // }
    readTable: function(callback) {
        connection.query('SELECT * FROM form_1', function(err, result) {
            if (err) {
                console.log(err);
                callback();
            } else {
                callback(result);
            }
        });
    }
}

// insertion's data: console.log(query.sql);