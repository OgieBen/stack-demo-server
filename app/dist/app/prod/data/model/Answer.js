"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Answer = exports.Answer = function () {
    function Answer(id, questionId, content, userId, timestamp) {
        _classCallCheck(this, Answer);

        this._id = id;
        this._questionId = questionId;
        this._content = content;
        this._userId = userId;
        this._timestamp = timestamp;
    }

    _createClass(Answer, [{
        key: "getId",
        value: function getId() {
            return this._id;
        }
    }, {
        key: "getQuestionId",
        value: function getQuestionId() {
            return this._questionId;
        }
    }, {
        key: "getContent",
        value: function getContent() {
            return this._content;
        }
    }, {
        key: "getTimestamp",
        value: function getTimestamp() {
            return this._timestamp;
        }
    }, {
        key: "getUserId",
        value: function getUserId() {
            return this._userId;
        }
    }]);

    return Answer;
}();
//# sourceMappingURL=Answer.js.map
