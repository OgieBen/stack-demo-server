import { Router } from 'express';
import { Factory } from '../Factory';
import axios from 'axios';

let router = Router();


let factory = new Factory();
// let auth = factory.getAuth();
let repo = factory.getRepo();


/**
 * Fetches all questions that have been asked on the platform
 * @method GET
 * 
 * @returns {JSON} List
 */
router.get('/', (req, res) => {

    repo.fetchAllQuestions((result) => {
        if (result) {
            console.log({
                data: result
            });

            res.json({
                msg: true,
                data: result,
            });
            return;
        }

        res.json({
            msg: false,
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
router.get('/all/:userId', (req, res) => {

    let userId = parseInt(req.params.userId);

    repo.fetchAllUserQuestions(userId, (result) => {
        if (result) {
            console.log({
                data: result
            });

            res.json({
                msg: true,
                data: result,
            });
            return;
        }

        res.json({
            msg: false,
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
router.get('/:questionId', (req, res) => {

    let questionId = parseInt(req.params.questionId);

    repo.fetchQuestion(questionId, (result) => {
        if (result) {

            console.log({
                data: result
            });

            res.json({
                msg: true,
                data: result,
            });
            return;
        }

        res.json({
            msg: false,
        });
    });
});

/**
 * Adds a question on  the platform
 * 
 * @method POST
 */
router.post('/', (req, res) => {

    let content = req.body.question;
    let userId = req.body.userId;

    repo
        .addQuestion(content, userId, (status) => {
            if (status) {
                res.json({
                    msg: true,
                });
                return;
            }
            res.json({
                msg: false,
            });
        });
});

/**
 * Removes a question from the platform
 * 
 * @method DELETE
 */
router.delete('/:questionId', (req, res) => {

    // let questionId = parseInt(req.params.questionId);
    let questionId = parseInt(req.body.questionId);

    repo
        .deleteQuestion(questionId, (status) => {
            if (status) {
                res.json({
                    msg: true,
                });
                return;
            }
            res.json({
                msg: false,
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
router.post('/:questionId/answers/:answerId/comments', (req, res) => {


    let answerId = parseInt(req.body.answerId);
    let content = req.body.comment.toString();
    let userId = parseInt(req.body.userId);

    repo
        .addCommentToAnwser(answerId, content, userId, (result) => {
            if (result) {

                console.log(result);
                res.json({
                    msg: true,
                });
                return;
            }
            res.json({
                msg: false,
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
router.put('/:questionId/answers/:answerId/upvote', (req, res) => {


    let answerId = parseInt(req.body.answerId);


    // check if user has upvoted before
    // if false upvote
    // else
    //  deny upvote 
    repo
        .upvoteAnswer(answerId, (result) => {
            if (result) {

                console.log(result);
                res.json({
                    msg: true,
                });
                return;
            }
            res.json({
                msg: false,
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
router.put('/:questionId/answers/:answerId/downvote', (req, res) => {


    let answerId = parseInt(req.body.answerId);

    // check if user has downvoted before
    // if false downvote
    // else
    //  deny downvote 

    repo
        .downVoteAnswer(answerId, (result) => {
            if (result) {

                console.log(result);
                res.json({
                    msg: true,
                });
                return;
            }
            res.json({
                msg: false,
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
router.post('/:questionId/answers', (req, res) => {

    let questionId = parseInt(req.body.questionId);
    let content = req.body.answer.toString();
    let userId = parseInt(req.body.userId);

    repo
        .addAnswer(questionId, content, userId, (result) => {
            if (result) {

                console.log(result);

                res.json({
                    msg: true,
                });
                return;
            }
            res.json({
                msg: false,
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
router.put('/:questionId/answers/:anwserId/', (req, res) => {
    // use flag to check if incoming request is an update 
    // if it is an update, update the answer entry

    let questionId = parseInt(req.body.questionId);
    let answerId = parseInt(req.body.answerId);
    let accept = req.body.accept;
    let userId = parseInt(req.body.userId);

    // if accept is true
    // and user id is of owner
    // mark answer as accepted
    if (accept) {
        repo
            .isUserAnswerOwner(userId, answerId, (status) => {
                // if user is owner
                if (status) {
                    // accept answer;
                    repo.setAcceptedAnswer(questionId, answerId, (status) => {
                        if (status) {
                            // console.log('Answer was successfully updated');
                            console.log('Preferred Answer was set');

                            res.json({
                                msg: true,
                            });

                            return;
                        }

                        res.json({
                            msg: false,
                        });
                    });
                }
            });
        return;
    }

    let updatedAnswer = req.body.answer;
    repo.updateAnswer(answerId, updatedAnswer, (status) => {

        if (status) {
            console.log('Update was successful');
            res.json({
                msg: true,
            });
            return;
        }

        console.log('Update was not successful');
        res.json({
            msg: false,
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
router.post('/search', (req, res) => {

    let searchKey = req.body.searchKey.toString();
    
    repo
        .searchForQuestions(searchKey, (result) => {
            if(result) {

                console.log(result);
                res.json({
                    msg: true,
                    data: result,
                });
                return;
            }
            res.json({
                msg: false,
            });
        });
});








module.exports = router;