'use strict';

var _express = require('express');

var _Factory = require('../Factory');

// import cors from 'cors';

var cors = require('cors');

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
router.get('/', cors(), function (req, res) {

    repo.fetchAllQuestions(function (result) {
        if (result) {

            res.json({
                msg: 'Success',
                status: true,
                data: result
            });
            return;
        }

        res.json({
            msg: 'There was an error fetching questions',
            status: false
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
router.get('/all/:userId', cors(), function (req, res) {

    var userId = parseInt(req.params.userId);

    repo.fetchAllUserQuestions(userId, function (result) {
        if (result) {

            res.json({
                msg: 'Success',
                status: true,
                data: result
            });
            return;
        }

        res.json({
            msg: 'There was an error fetching questions',
            status: true
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
router.get('/:questionId', cors(), function (req, res) {

    var questionId = parseInt(req.params.questionId);

    repo.fetchQuestion(questionId, function (question) {
        if (question) {

            console.log({
                question: question
            });

            repo.fetchAnswers(questionId, function (answers) {
                if (answers) {

                    res.json({
                        msg: 'Success',
                        status: false,
                        question: question,
                        answers: answers
                    });
                    return;
                }

                res.json({
                    msg: 'There was an error fetching answers for question with id ' + questionId,
                    status: false
                });
            });
            return;
        }

        res.json({
            msg: 'There was an Error fetching Question with id ' + questionId,
            status: false
        });
    });
});

/**
 * Adds a question on  the platform
 * 
 * @method POST
 */
router.post('/', cors(), function (req, res) {

    var content = req.body.question;
    var userId = req.body.userId;

    repo.addQuestion(content, userId, function (status) {
        if (status) {
            res.json({
                msg: 'Success',
                status: true
            });
            return;
        }
        res.json({
            msg: 'Error adding Question',
            status: false
        });
    });
});

/**
 * Removes a question from the platform
 * 
 * @method DELETE
 */
router.delete('/:questionId', cors(), function (req, res) {

    // let questionId = parseInt(req.params.questionId);
    var questionId = parseInt(req.body.questionId);

    repo.deleteQuestion(questionId, function (status) {
        if (status) {
            res.json({
                msg: 'Success',
                status: true
            });
            return;
        }
        res.json({
            msg: 'Error deleting Question',
            status: false
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
router.post('/:questionId/answers/:answerId/comments', cors(), function (req, res) {

    var answerId = parseInt(req.body.answerId);
    var content = req.body.comment.toString();
    var userId = parseInt(req.body.userId);

    repo.addCommentToAnwser(answerId, content, userId, function (result) {
        if (result) {

            console.log(result);
            res.json({
                msg: 'Success',
                status: true
            });
            return;
        }
        res.json({
            msg: "Error adding Comment",
            status: false
        });
    });
});

/**
 * Upvotes an Answer
 * 
 * @method PUT
 * @param {Integer} answerId
 * 
 * @returns {Boolean} 
 */
router.put('/:questionId/answers/:answerId/upvote', cors(), function (req, res) {

    var answerId = parseInt(req.body.answerId);

    // check if user has upvoted before
    // if false upvote
    // else
    //  deny upvote 
    repo.upvoteAnswer(answerId, function (result) {
        if (result) {

            console.log(result);
            res.json({
                msg: 'Success',
                status: true
            });
            return;
        }
        res.json({
            msg: 'Error up-voting answer',
            status: false
        });
    });
});

/**
 * Downvotes an Answer
 * 
 * @method PUT
 * @param {Integer} answerId
 * 
 * @returns {Boolean} 
 */
router.put('/:questionId/answers/:answerId/downvote', cors(), function (req, res) {

    var answerId = parseInt(req.body.answerId);

    // check if user has downvoted before
    // if false downvote
    // else
    //  deny downvote 

    repo.downVoteAnswer(answerId, function (result) {
        if (result) {

            console.log(result);
            res.json({
                msg: 'Success',
                status: true
            });
            return;
        }
        res.json({
            msg: 'Error down-voting answer',
            status: false
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
                msg: 'Success',
                status: true
            });
            return;
        }
        res.json({
            msg: 'Error adding Answer to question with id ' + questionId,
            status: false
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
                            msg: 'Success',
                            status: true
                        });

                        return;
                    }

                    res.json({
                        msg: 'Answer was not selected',
                        status: false
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
                msg: 'Success',
                status: true
            });
            return;
        }

        console.log('Update was not successful');
        res.json({
            msg: 'Update was not successful',
            status: false
        });
    });
});

/**
 * Searches for questions based on query
 * 
 * @method POST
 * @param {Integer} id
 * 
 * @returns {JSON} Question
 */
router.post('/search', function (req, res) {

    var searchKey = req.body.searchKey.toString();

    repo.searchForQuestions(searchKey, function (result) {
        if (result) {

            console.log(result);
            res.json({
                msg: 'Success',
                status: true,
                data: result
            });
            return;
        }
        res.json({
            msg: "No matching result was found",
            status: false
        });
    });
});

router.get('/user/:id', function (req, res) {
    // let userId = req.body.userId;
    var userId = req.params.id;
    try {
        userId = parseInt(userId);
        repo.getUser(userId, function (result) {
            if (result) {

                console.log(result);
                res.json({
                    msg: 'Success',
                    status: true,
                    data: result
                });
                return;
            }
            res.json({
                msg: 'No user with ' + userId + ' was found',
                status: false
            });
        });
    } catch (e) {
        res.json({
            msg: "Invalid query parameter",
            status: false
        });
    }
});

router.get('/answers/count/:id', function (req, res) {

    var userId = req.params.id;
    try {
        userId = parseInt(userId);
        repo.getUserAnswers(userId, function (result) {
            if (result) {

                console.log(result);
                res.json({
                    msg: 'Success',
                    status: true,
                    data: result
                });
                return;
            }
            res.json({
                msg: 'No user with ' + userId + ' was found',
                status: false
            });
        });
    } catch (e) {
        res.json({
            msg: "Invalid query parameter",
            status: false
        });
    }
});

module.exports = router;
//# sourceMappingURL=questions.js.map
