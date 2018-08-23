"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QComment = exports.QComment = function () {
    function QComment(commentId, questionId, userId, content, timestamp) {
        _classCallCheck(this, QComment);

        this._commentId = commentId;
        this._questionId = questionId;
        this._content = content;
        this._userId = userId;
        this._timestamp = timestamp;
    }

    _createClass(QComment, [{
        key: "getQuestionId",
        value: function getQuestionId() {
            return this._questionId;
        }
    }, {
        key: "getCommentId",
        value: function getCommentId() {
            return this._commentId;
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

    return QComment;
}();
//# sourceMappingURL=QComment.js.map
