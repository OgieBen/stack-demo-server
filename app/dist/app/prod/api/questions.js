'use strict';

var _express = require('express');

// import { Factory } from '../Factory';

var router = (0, _express.Router)();

// let factory = new Factory();
// let auth = factory.getAuth();


/**
 * Fetches all questions that have been asked on the platform
 * 
 * @returns {JSON} List
 */
router.get('/', function (req, res, next) {});

/**
 * Fetch a specific question
 * This should come with all the answers
 * provided so far for the question.
 * 
 * @method POST
 * @param {Integer} id
 * 
 * @returns {JSON} Question
 */
router.get('/{id}', function (req, res, next) {});

/**
 * Adds a question the platform
 */
router.post('/', function (req, res, next) {});

/**
 * Removes a question from the platform
 */
router.delete('/{id}', function (req, res, next) {});

module.exports = router;
//# sourceMappingURL=questions.js.map
