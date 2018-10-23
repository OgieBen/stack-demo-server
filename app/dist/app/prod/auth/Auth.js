'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Auth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import { Factory } from '../Factory';


var _Answer = require('../data/model/Answer');

var _DBHelper = require('../data/db/DBHelper');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _detectBrowser = require('detect-browser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var browser = (0, _detectBrowser.detect)();

var Auth = exports.Auth = function () {
    function Auth() {
        _classCallCheck(this, Auth);

        // this._factory = new Factory();
        this._dbc = new _DBHelper.DBHelper();
    }

    _createClass(Auth, [{
        key: 'getDb',
        value: function getDb() {
            return this._dbc;
        }

        /**
         * Authenticates users i.e. check if users are registered,
         * then logs them in
         * 
         * @param {String} email 
         * @param {String} passWord 
         * 
         * @returns {Boolean}
         */

    }, {
        key: 'authenticate',
        value: function authenticate(email, password, callback) {
            // let flag = false;
            var fetchUserQuery = {
                name: 'fetch-user',
                text: 'SELECT * FROM users WHERE email = $1 AND  password = $2 ',
                values: [email.toString(), password.toString()]
            };

            if (this.validate(email, password)) {

                this.getDb().queryWithConfig(fetchUserQuery, function (err, result) {
                    if (err) {
                        console.error(err.stack);
                        console.log("Authentication failure");
                        callback(false);
                        return;
                    }

                    var resultLength = result.rows.length;
                    console.log(email + password);

                    if (result.rows.length === 1) {
                        var status = true;
                        console.log("Authentication success");
                        callback(status, result.rows);

                        result.rows.forEach(function (user) {
                            console.log(user);
                        });
                        return;
                    }

                    console.log("Authentication failure: Invalid User " + resultLength);
                    callback(false, 0);
                });
            }
        }

        /**
         * Adds user to database
         * 
         * @param {String} email 
         * @param {String} password 
         * 
         * @returns {Boolean}
         */

    }, {
        key: 'addUser',
        value: function addUser(name, email, password, callback) {
            var _this = this;

            // let flag = false;

            var addUserQuery = {
                name: 'add-user',
                text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3)',
                values: [name, email, password]

            };

            this.getDb().queryWithConfig(addUserQuery, function (err, result) {
                if (err) {
                    console.log("Could not sign up user");
                    callback(false);
                    console.error(err.stack);
                    return;
                }

                console.log("Added User sucessfully");

                // signs user in and creates a session
                _this.login(email, password, function (flag, data) {
                    callback(flag, data);
                });
            });
        }

        /**
         * Logs user into the platform
         * 
         * @param {String} email 
         * @param {String} password 
         */

    }, {
        key: 'login',
        value: function login(email, password, callback) {

            // let flag = false;

            this.authenticate(email, password, function (flag, data) {
                if (flag) {
                    console.log("Login was sucessful");
                }
                callback(flag, data);
            });
        }

        /**
         * Signs user up
         * 
         * @param {String} name
         * @param {String} email 
         * @param {String} password 
         * 
         * @returns {Boolean}
         */

    }, {
        key: 'signUp',
        value: function signUp(name, email, password, callback) {

            if (this.validate(name, email, password)) {
                return this.addUser(name, email, password, function (flag, data) {
                    if (flag) {
                        callback(flag, data);
                        return;
                    }
                    callback(false);
                });
            }

            callback(false);
        }

        /**
         * Validates parameters 
         * 
         * @param {String} email 
         * @param {String} password 
         * 
         * @returns {Boolean}
         */

    }, {
        key: 'validate',
        value: function validate(name, email, password) {

            return true;
        }
    }, {
        key: 'createFootprint',
        value: function createFootprint(email, password) {

            var footPrint = email + password + browser.name + browser.os + browser.version;
            var cipher = _crypto2.default.createCipher('aes192', process.env.salt);

            var encrypted = cipher.update(footPrint, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        }
    }, {
        key: 'checkUserSession',
        value: function checkUserSession() {

            /*  const decipher = crypto.createDecipher('aes192', process.env.salt);
             let decrypted = decipher.update(encrypted, 'hex', 'utf8');
             decrypted += decipher.final('utf8'); */

            console.log("Decrypted: " + decrypted);
        }
    }, {
        key: 'testModel',
        value: function testModel() {
            var _answer = new _Answer.Answer(1, 2, "", ""); //new Answer(1, 2, "", "" );
            return _answer.getId();
        }
    }]);

    return Auth;
}();
//# sourceMappingURL=Auth.js.map
