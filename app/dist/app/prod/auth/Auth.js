'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Auth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import { Factory } from '../Factory';


var _Answer = require('../data/model/Answer');

var _DBHelper = require('../data/db/DBHelper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = exports.Auth = function () {
    function Auth() {
        _classCallCheck(this, Auth);

        // this._factory = new Factory();
        this._dbc = new _DBHelper.DBHelper();
    }

    _createClass(Auth, [{
        key: 'getFactory',
        value: function getFactory() {
            // return this._factory;
        }
    }, {
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

                    if (result.rows.length === 1) {
                        var status = true;
                        console.log("Authentication success");
                        callback(status);

                        result.rows.forEach(function (user) {
                            console.log(user);
                        });
                        return;
                    }

                    console.log("Authentication failure: Invalid User " + resultLength);
                    callback(false);
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

                callback(true);
                // signs user in and creates a session
                _this.login(email, password, function (flag) {});
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

            this.authenticate(email, password, function (flag) {
                if (flag) {
                    console.log("Login was sucessful");
                }
                callback(flag);
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
                return this.addUser(name, email, password, function (flag) {
                    if (flag) {
                        callback(flag);
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
        key: 'testModel',
        value: function testModel() {
            var _answer = new _Answer.Answer(1, 2, "", ""); //new Answer(1, 2, "", "" );
            return _answer.getId();
        }
    }]);

    return Auth;
}();
//# sourceMappingURL=Auth.js.map
