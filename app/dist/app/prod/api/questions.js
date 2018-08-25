'use strict';

var _express = require('express');

var _Factory = require('../Factory');

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
 * Fetch a specific question
 * This should come with all the answers
 * provided so far for the question.
 * 
 * @method GET
 * @param {Integer} id
 * 
 * @returns {JSON} Question
 */
router.get('/:id', function (req, res) {

    var questionId = parseInt(req.params.id);

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
 * Adds a question the platform
 * 
 * @method POST
 */
router.post('/', function (req, res) {

    var content = req.params.content;
    var userId = req.params.id;

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
router.delete('/:id', function (req, res) {

    var questionId = parseInt(req.params.id);

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
 * Post an answer to a question
 * 
 * @method POST
 * @param {Integer} id
 * 
 * @returns {JSON} Question
 */
router.get('/:questionId/answers', function (req, res) {

    var questionId = parseInt(req.params.questionId);

    repo.fetchAnswers(questionId, function (result) {
        if (result) {

            console.log(result);
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
router.post('/:questionId/anwsers/:anwserId', function (req, res) {
    // use flag to check if incoming request is an update 
    // if it is an update, update the answer entry


});

module.exports = router;
//# sourceMappingURL=questions.js.map
