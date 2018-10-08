'use strict';

var _express = require('express');

var _Factory = require('../Factory');

var _detectBrowser = require('detect-browser');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config();
var router = (0, _express.Router)();

var factory = new _Factory.Factory();
var auth = factory.getAuth();
var browser = (0, _detectBrowser.detect)();

var db = factory.getDbc();

/**
 *  This endpoint authenticates a user using th user's password and email 
 *  (Note: change method from get to post)
 *  PAYLOAD:
 * @method POST
 * @param String email
 * @param String password
 * 
 * @returns JSON
 */
router.post('/login', function (req, res) {

    var email = req.body.email.toString();
    var password = req.body.password.toString();

    auth.login(email, password, function (flag, data) {

        if (flag) {

            var encrypted = '';
            var footPrint = email + password + browser.name + browser.os + browser.version;
            var cipher = _crypto2.default.createCipher('aes192', footPrint);

            cipher.on('readable', function () {
                var data = cipher.read();
                if (data) {
                    encrypted += data.toString('hex');
                }
            });

            cipher.on('end', function () {
                console.log(encrypted);
                req.session.footprint = encrypted;
                req.cookie(email, encrypted);
            });

            if (typeof data !== 'undefined') {
                console.log("Value" + data[0].id);

                res.json({
                    msg: "Login Succesful",
                    status: true,
                    userId: data[0].id

                });
                return;
            }

            res.json({
                msg: "Login Error: Could not get user",
                status: false
            });

            return;
        }
        if (flag === 'undefined' || flag == false) {
            res.json({
                msg: "Login Error: please check credentials ",
                status: false
            });
        }
    });
});

/**
 * This endpoint create a user account
 * 
 * @method POST
 * 
 * @param String email
 * @param String password
 * 
 * @return JSON 
 */
router.post('/signup', function (req, res) {

    // TODO validate and clean user date

    var name = req.body.name.toString();
    var email = req.body.email.toString();
    var password = req.body.password.toString();

    console.log('parameters: ' + (name, email, password));

    auth.signUp(name, email, password, function (flag, data) {
        if (flag) {

            var encrypted = '';
            var footPrint = email + password + browser.name + browser.os + browser.version;
            var cipher = _crypto2.default.createCipher('aes192', footPrint);

            cipher.on('readable', function () {
                var data = cipher.read();
                if (data) {
                    encrypted += data.toString('hex');
                }
            });

            cipher.on('end', function () {
                console.log(encrypted);
                req.session.footprint = encrypted;
                req.cookie(email, encrypted);
            });

            console.log("Value" + data);
            if (typeof data !== 'undefined') {
                console.log("Value" + data);

                res.json({
                    msg: "Sign Up Succesful",
                    status: true,
                    userId: data[0].id

                });
                return;
            }

            res.json({
                msg: "Login Error: Could not retrive user creds",
                status: false
            });

            return;
        }

        res.json({
            msg: "Login Error: please check credentials ",
            status: false
        });
    });
});

router.get('/dbsetup/:key', function (req, res) {

    // let key = req.params.key.toString();

    // if (key ===  "123"){


    // let createDb = db.createDatabase();

    // set up db
    var result = db.setUpDb();

    if (result) {
        res.json({
            msg: true
        });
    }

    res.json({
        msg: false
    });

    // }
});

router.get('/cleardb', function (req, res) {

    db.dropTables(function (result) {
        if (result != false) {

            res.json({
                msg: 'success',
                status: false
            });
            return;
        }
    });

    res.json({
        msg: 'error',
        status: false
    });
});

router.get('/crypto', function (req, res) {

    var email = 'bensoft2k5@gmail.com';
    var password = 'admin';

    var footPrint = email + password + browser.name + browser.os + browser.version;
    var cipher = _crypto2.default.createCipher('aes192', email);
    var decipher = _crypto2.default.createDecipher('aes192', email);

    var encrypted = cipher.update(footPrint, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log("Encrypted: " + encrypted);

    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log("Decrypted: " + decrypted);

    req.session.footprint = encrypted;
    var sessionFootPrint = req.session.footprint;

    if (sessionFootPrint === 'undefined') {
        res.send(500, "invalid session");
        return;
    }

    res.json({
        encrypted: encrypted,
        decrypted: decrypted,
        footprint: req.session.footprint
    });
});

router.get('/footprint', function (req, res) {
    res.send(req.session.footprint);
});

module.exports = router;
//# sourceMappingURL=Auth.js.map
