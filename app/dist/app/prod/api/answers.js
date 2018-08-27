'use strict';

var _express = require('express');

// import { Factory } from '../Factory';

var router = (0, _express.Router)();

// let factory = new Factory();
// let auth = factory.getAuth();


/**
 * Post an answer to a question
 * 
 * @method POST
 * @param {Integer} id
 * 
 * @returns {JSON} Question
 */
router.post('/anwsers', function (req, res) {});

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
router.put('/anwsers/:anwserId', function (req, res) {
  // use flag to check if incoming request is an update 
  // if it is an update, update the answer entry
});

module.exports = router;
//# sourceMappingURL=answers.js.map
