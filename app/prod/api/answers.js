import  { Router } from 'express';
// import { Factory } from '../Factory';

let router = Router();


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
router.post('/anwsers', (req, res) => {

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
router.put('/anwsers/{anwserId}', (req, res) => {
    // use flag to check if incoming request is an update 
    // if it is an update, update the answer entry
});





module.exports = router;