// var readline = require('linebyline');
var readline = require('readline-sync');
var bcrypt = require('bcrypt');
var dbOperations = require('../dbOperations');


var email,
    password;
var checkLogin = false;
do {
    email = readline.question("Please enter your E-mail address, as future login to site administration:  ");
    let confirmEmail = readline.question("Please repeat:  ");
    if (email == confirmEmail) {
        checkLogin = true;
    } else {
        let answer = readline.question("Reapeat does not match the previous. Want to try once more (type 'y')? ");
        if (answer !== 'y') {
            process.exit();
        } 
    }
} while (checkLogin == false);

var checkPass = false;
do {
    password = readline.question("Please create your password for login to site administration:  ");
    let confirmPass = readline.question("Please repeat:  ");
    if (password == confirmPass) {
        checkPass = true;
    } else {
        let answer = readline.question("Reapeat does not match the previous. Want to try once more (type 'y')? ");
        if (answer !== 'y') {
            process.exit();
        } 
    }
} while (checkPass == false);

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHash = bcrypt.hashSync(password, salt);

var adminuser = {
    email: email,
    password: passwordHash,
    salt: salt
};

dbOperations.createAdminUser(adminuser, (function(err) {
    if (err) {
        console.log(err.sqlMessage);
    } else {
        console.log('Admin-user successfully created!');
        process.exit();
    }
}));

