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

    _createClass(Auth, [{
        key: "authenticate",
        value: function authenticate(email, passWord) {
            return false;
        }
    }, {
        key: "login",
        value: function login(email, password) {
            return true;
        }
    }, {
        key: "signUp",
        value: function signUp(email, password) {
            return false;
        }
    }, {
        key: "registerUser",
        value: function registerUser(email, password) {
            return fasle;
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
