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
router.get('/delete/:id', function (req, res) {

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

module.exports = router;
//# sourceMappingURL=questions.js.map
