'use strict';

var _express = require('express');

var _Factory = require('../Factory');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

var factory = new _Factory.Factory();
// let auth = factory.getAuth();
var repo = factory.getRepo();

/**
 * Fetches all questions that have been asked on the platform
 * @method GET
 * 
 * @returns {JSON} List
 */
router.get('/', function (req, res) {

    repo.fetchAllQuestions(function (result) {
        if (result) {
            console.log({
                data: result
            });

            res.json({
                msg: true,
                data: result
            });
            return;
        }

        res.json({
            msg: false
        });
    });
});

/**
 * Fetches all questions that a particular user has asked on the platform
 * @method GET
 * 
 * @param {Integer} userId
 * 
 * @returns {JSON} List
 */
router.get('/all/:userId', function (req, res) {

    var userId = parseInt(req.params.userId);

    repo.fetchAllUserQuestions(userId, function (result) {
        if (result) {
            console.log({
                data: result
            });

            res.json({
                msg: true,
                data: result
            });
            return;
        }

        res.json({
            msg: false
        });
    });
});

/**
 * Fetch a specific question
 * This should come with all the answers
 * provided so far for the question.
 * 
 * @method GET
 * @param {Integer} id
 * 
 * @returns {JSON} Question
 */
router.get('/:questionId', function (req, res) {

    var questionId = parseInt(req.params.questionId);

    repo.fetchQuestion(questionId, function (result) {
        if (result) {

            console.log({
                data: result
            });

            res.json({
                msg: true,
                data: result
            });
            return;
        }

        res.json({
            msg: false
        });
    });
});

/**
 * Adds a question on  the platform
 * 
 * @method POST
 */
router.post('/', function (req, res) {

    var content = req.body.question;
    var userId = req.body.userId;

    repo.addQuestion(content, userId, function (status) {
        if (status) {
            res.json({
                msg: true
            });
            return;
        }
        res.json({
            msg: false
        });
    });
});

/**
 * Removes a question from the platform
 * 
 * @method DELETE
 */
router.delete('/:questionId', function (req, res) {

    // let questionId = parseInt(req.params.questionId);
    var questionId = parseInt(req.body.questionId);

    repo.deleteQuestion(questionId, function (status) {
        if (status) {
            res.json({
                msg: true
            });
            return;
        }
        res.json({
            msg: false
        });
    });
});

/**
 * Adds comment to questions being asked
 * 
 * @method POST
 * @param {Integer} questionId
 * @param {Integer} answerId
 * 
 * 
 * @returns {Boolean} 
 */
router.post('/:questionId/answers/:answerId/comments', function (req, res) {

    var answerId = parseInt(req.body.answerId);
    var content = req.body.comment.toString();
    var userId = parseInt(req.body.userId);

    repo.addCommentToAnwser(answerId, content, userId, function (result) {
        if (result) {

            console.log(result);
            res.json({
                msg: true
            });
            return;
        }
        res.json({
            msg: false
        });
    });
});

/**
 * Post an answer to a question
 * 
 * @method POST
 * @param {Integer} id
 * 
 * @returns {JSON} Question
 */
router.post('/:questionId/answers', function (req, res) {

    var questionId = parseInt(req.body.questionId);
    var content = req.body.answer.toString();
    var userId = parseInt(req.body.userId);

    repo.addAnswer(questionId, content, userId, function (result) {
        if (result) {

            console.log(result);
            res.json({
                msg: true
            });
            return;
        }
        res.json({
            msg: false
        });
    });
});

/**
 * 
 * Mark an answer as
 * accepted or
 * update an answer.
 * 
 * This endpoint should be available to
 * only the answer author and question
 * author. The answer author calls the
 * route to update answer while the
 * question author calls the route to
 * accept answer.
 * 
 * @method PUT
 * 
 * @return {Boolean}
 */
router.put('/:questionId/answers/:anwserId/', function (req, res) {
    // use flag to check if incoming request is an update 
    // if it is an update, update the answer entry

    var questionId = parseInt(req.body.questionId);
    var answerId = parseInt(req.body.answerId);
    var accept = req.body.accept;
    var userId = parseInt(req.body.userId);

    // if accept is true
    // and user id is of owner
    // mark answer as accepted
    if (accept) {
        repo.isUserAnswerOwner(userId, answerId, function (status) {
            // if user is owner
            if (status) {
                // accept answer;
                repo.setAcceptedAnswer(questionId, answerId, function (status) {
                    if (status) {
                        // console.log('Answer was successfully updated');
                        console.log('Preferred Answer was set');

                        res.json({
                            msg: true
                        });

                        return;
                    }

                    res.json({
                        msg: false
                    });
                });
            }
        });
        return;
    }

    var updatedAnswer = req.body.answer;
    repo.updateAnswer(answerId, updatedAnswer, function (status) {

        if (status) {
            console.log('Update was successful');
            res.json({
                msg: true
            });
            return;
        }

        console.log('Update was not successful');
        res.json({
            msg: false
        });
    });
});

/**
 * simple test route
 */
router.get('/home/form', function (req, res) {

    var homePath = _path2.default.resolve(_path2.default.join(__dirname, '../../../../'));
    var absolutePath = _path2.default.normalize(homePath + "/public/html/index.html");

    res.sendFile(absolutePath);
});

module.exports = router;
//# sourceMappingURL=questions.js.map
