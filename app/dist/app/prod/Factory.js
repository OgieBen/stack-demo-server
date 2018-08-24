'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Factory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DBHelper = require('./data/db/DBHelper');

var _Auth = require('./auth/Auth');

var _Answer = require('./data/model/Answer');

var _QComment = require('./data/model/QComment');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Factory = exports.Factory = function () {
    function Factory() {
        _classCallCheck(this, Factory);

        this.dbC = new _DBHelper.DBConnector();
        this.auth = new _Auth.Auth();
    }

    _createClass(Factory, [{
        key: 'getCommentClass',
        value: function getCommentClass() {
            return new _QComment.Comment();
        }
    }, {
        key: 'getdbC',
        value: function getdbC() {
            return this.dbC;
        }
    }, {
        key: 'getAnswer',
        value: function getAnswer() {
            return new _Answer.Answer();
        }
    }, {
        key: 'getAuth',
        value: function getAuth() {
            return this.auth;
        }
    }]);

    return Factory;
}();
//# sourceMappingURL=Factory.js.map
