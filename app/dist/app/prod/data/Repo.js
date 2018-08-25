'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Repo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DBHelper = require('./db/DBHelper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repo = exports.Repo = function () {
    function Repo() {
        _classCallCheck(this, Repo);

        this._db = new _DBHelper.DBHelper();
    }

    _createClass(Repo, [{
        key: 'addQuestion',
        value: function addQuestion(content, userId, callback) {

            var query = {
                name: 'fetch-questions',
                text: 'INSERT INTO questions(content, user_id) VALUES($1, $2);',
                values: [content, userId]
            };
            this._db.queryWithConfig(query, function (err, res) {
                if (err) {
                    callback(false);
                    console.log("Error adding question : \n");
                    console.error(err.stack);
                    return;
                }

                // true means query ran right;
                callback(true);
            });
        }
    }, {
        key: 'deleteQuestion',
        value: function deleteQuestion(questionId, callback) {
            var query = {
                name: 'delete-questions',
                text: 'DELETE FROM questions where id = $1;',
                values: [questionId]

                //'DELETE FROM questions where id = $1;', //'DELETE FROM questions where id = $1 AND user_id = $2;',
            };this._db.queryWithConfig(query, function (err, res) {
                if (err) {
                    callback(false);
                    console.log("Error deleting question : \n");
                    console.error(err.stack);
                    return;
                }

                // true means query ran right;
                console.log("Delete was Succesful");
                callback(true);
            });
        }
    }, {
        key: 'fetchAllQuestions',
        value: function fetchAllQuestions(callback) {

            var query = {
                name: 'fetch-all-questions',
                text: 'SELECT * from questions',
                values: []
            };
            this._db.queryWithConfig(query, function (err, res) {
                if (err) {
                    callback(false);
                    console.log("Error fetching questions");
                    return;
                }

                callback(res.rows);
            });
        }
    }, {
        key: 'fetchQuestion',
        value: function fetchQuestion(questionId, callback) {
            var query = {
                name: 'fetch-question',
                text: 'SELECT * from questions where id = $1',
                values: [questionId]
            };
            this._db.queryWithConfig(query, function (err, res) {
                if (err) {
                    callback(false);
                    console.log("Error fetching question");
                    return;
                }

                callback(res.rows);
            });
        }
    }, {
        key: 'fetchAnswers',
        value: function fetchAnswers() {}
    }, {
        key: 'fetchQuestionWithHighestAnswers',
        value: function fetchQuestionWithHighestAnswers() {}
    }, {
        key: 'fetchUserQuestions',
        value: function fetchUserQuestions() {}
    }, {
        key: 'addCommentToAnwser',
        value: function addCommentToAnwser() {}
    }, {
        key: 'addCommentToQuestion',
        value: function addCommentToQuestion() {}

        /* upvote and downvotes */

    }, {
        key: 'upvoteAnswer',
        value: function upvoteAnswer() {}
    }, {
        key: 'downVoteAnswer',
        value: function downVoteAnswer() {}

        /* search */

    }, {
        key: 'searchForAnswers',
        value: function searchForAnswers() {}
    }]);

    return Repo;
}();
//# sourceMappingURL=Repo.js.map
