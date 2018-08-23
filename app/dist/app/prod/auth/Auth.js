"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Auth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Answer = require("../data/model/Answer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = exports.Auth = function () {
    function Auth() {
        _classCallCheck(this, Auth);
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


    _createClass(Auth, [{
        key: "authenticate",
        value: function authenticate(email, passWord) {
            return false;
        }

        /**
         * Logs user into the platform
         * 
         * @param {String} email 
         * @param {String} password 
         */

    }, {
        key: "login",
        value: function login(email, password) {

            if (this.authenticate(email, password)) {
                // create user session here:
                return true;
            }
            return false;
        }

        /**
         * Signs user up
         * 
         * @param {String} email 
         * @param {String} password 
         * 
         * @returns {Boolean}
         */

    }, {
        key: "signUp",
        value: function signUp(email, password) {

            if (this.validate(email, password)) {
                return this.addUser(email, password);
            }
            return false;
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
        key: "addUser",
        value: function addUser(email, password) {
            return false;
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
        key: "validate",
        value: function validate(email, password) {

            return false;
        }
    }, {
        key: "testModel",
        value: function testModel() {
            var _answer = new _Answer.Answer(1, 2, "", ""); //new Answer(1, 2, "", "" );
            return _answer.getId();
        }
    }]);

    return Auth;
}();
//# sourceMappingURL=Auth.js.map
