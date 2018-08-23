"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = exports.User = function () {
    function User(id, email, password) {
        _classCallCheck(this, User);

        this._id = id;
        this._email = email;
        this._password = password;
    }

    _createClass(User, [{
        key: "getId",
        value: function getId() {
            return this._id;
        }
    }, {
        key: "getEmail",
        value: function getEmail() {
            return this._email;
        }
    }, {
        key: "getPassword",
        value: function getPassword() {
            return this._password;
        }
    }]);

    return User;
}();
//# sourceMappingURL=User.js.map
