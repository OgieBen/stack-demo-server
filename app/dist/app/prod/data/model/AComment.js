"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AComment = exports.AComment = function () {
    function AComment(commentId, answerId, userId, content, timestamp) {
        _classCallCheck(this, AComment);

        this._commentId = commentId;
        this._answerId = answerId;
        this._userId = userId;
        this._content = content;
        this._timestamp = timestamp;
    }

    _createClass(AComment, [{
        key: "getAnswerId",
        value: function getAnswerId() {
            return this._answerId;
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

    return AComment;
}();
//# sourceMappingURL=AComment.js.map
