import  { Router } from 'express';
import { Factory } from '../Factory';

let router = Router();


let factory = new Factory();
let auth = factory.getAuth();


/**
 * Fetches all questions that have been asked on the platform
 * 
 * @returns {JSON} List
 */
router.get('/', (req, res, next) => {

});

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
router.get('/{id}', (req, res, next) => {

});

/**
 * Adds a question the platform
 */
router.post('/', (req, res, next) => {

});

/**
 * Removes a question from the platform
 */
router.delete('/{id}', (req, res, next) => {

});



module.exports = router;