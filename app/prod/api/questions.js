import { Router } from 'express';
import { Factory } from '../Factory';
// import cors from 'cors';

let cors = require('cors');

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
router.get('/', cors(), (req, res) => {

    repo.fetchAllQuestions((result) => {
        if (result) {

            res.json({
                msg: 'Success',
                status: true,
                data: result,
            });
            return;
        }

        res.json({
            msg: 'There was an error fetching questions',
            status: false,
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
router.get('/all/:userId', cors(), (req, res) => {

    let userId = parseInt(req.params.userId);

    repo.fetchAllUserQuestions(userId, (result) => {
        if (result) {

            res.json({
                msg: 'Success',
                status: true,
                data: result,
            });
            return;
        }

        res.json({
            msg: 'There was an error fetching questions',
            status: true,
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
router.get('/:questionId', cors(), (req, res) => {

    let questionId = parseInt(req.params.questionId);

    repo.fetchQuestion(questionId, (question) => {
        if (question) {

            console.log({
                question
            });

            repo.fetchAnswers(questionId, (answers) => {
                if (answers) {

                    res.json({
                        msg: 'Success',
                        status: false,
                        question,
                        answers,
                    });
                    return;
                }

                res.json({
                    msg: 'There was an error fetching answers for question with id ' + questionId,
                    status: false,
                });

            });
            return;
        }

        res.json({
            msg: 'There was an Error fetching Question with id ' + questionId,
            status: false,
        });
    });
});

/**
 * Adds a question on  the platform
 * 
 * @method POST
 */
router.post('/', cors(), (req, res) => {

    let content = req.body.question;
    let userId = req.body.userId;

    repo
        .addQuestion(content, userId, (status) => {
            if (status) {
                res.json({
                    msg: 'Success',
                    status: true,
                });
                return;
            }
            res.json({
                msg: 'Error adding Question',
                status: false,
            });
        });
});

/**
 * Removes a question from the platform
 * 
 * @method DELETE
 */
router.delete('/:questionId', cors(), (req, res) => {

    // let questionId = parseInt(req.params.questionId);
    let questionId = parseInt(req.body.questionId);

    repo
        .deleteQuestion(questionId, (status) => {
            if (status) {
                res.json({
                    msg: 'Success',
                    status: true,
                });
                return;
            }
            res.json({
                msg: 'Error deleting Question',
                status: false,
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
router.post('/:questionId/answers/:answerId/comments', cors(), (req, res) => {


    let answerId = parseInt(req.body.answerId);
    let content = req.body.comment.toString();
    let userId = parseInt(req.body.userId);

    repo
        .addCommentToAnwser(answerId, content, userId, (result) => {
            if (result) {

                console.log(result);
                res.json({
                    msg: 'Success',
                    status: true,
                });
                return;
            }
            res.json({
                msg: "Error adding Comment",
                status: false,
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
router.put('/:questionId/answers/:answerId/upvote', cors(), (req, res) => {


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
                    msg: 'Success',
                    status: true,
                });
                return;
            }
            res.json({
                msg: 'Error up-voting answer',
                status: false,
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
router.put('/:questionId/answers/:answerId/downvote', cors(), (req, res) => {


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
                    msg: 'Success',
                    status: true,
                });
                return;
            }
            res.json({
                msg: 'Error down-voting answer',
                status: false,
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
                    msg: 'Success',
                    status: true,
                });
                return;
            }
            res.json({
                msg: 'Error adding Answer to question with id ' + questionId,
                status: false,
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
                                msg: 'Success',
                                status: true,
                            });

                            return;
                        }

                        res.json({
                            msg: 'Answer was not selected',
                            status: false,
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
                msg: 'Success',
                status: true,
            });
            return;
        }

        console.log('Update was not successful');
        res.json({
            msg: 'Update was not successful',
            status: false,
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
router.post('/search', (req, res) => {

    let searchKey = req.body.searchKey.toString();

    repo
        .searchForQuestions(searchKey, (result) => {
            if (result) {

                console.log(result);
                res.json({
                    msg: 'Success',
                    status: true,
                    data: result,
                });
                return;
            }
            res.json({
                msg: "No matching result was found",
                status: false,
            });
        });
});



router.get('/user/:id', (req, res) => {
    // let userId = req.body.userId;
    let userId = req.params.id;
    try {
        userId = parseInt(userId);
        repo
        .getUser(userId, (result) => {
            if (result) {

                console.log(result);
                res.json({
                    msg: 'Success',
                    status: true,
                    data: result,
                });
                return;
            }
            res.json({
                msg: `No user with ${userId} was found`,
                status: false,
            });
        });
    } catch (e) {
        res.json({
            msg: "Invalid query parameter",
            status: false,
        });
    }

});


router.get('/answers/count/:id', (req, res) => {

    let userId = req.params.id;
    try {
        userId = parseInt(userId);
        repo
        .getUserAnswers(userId, (result) => {
            if (result) {

                console.log(result);
                res.json({
                    msg: 'Success',
                    status: true,
                    data: result,
                });
                return;
            }
            res.json({
                msg: `No user with ${userId} was found`,
                status: false,
            });
        });
    } catch (e) {
        res.json({
            msg: "Invalid query parameter",
            status: false,
        });
   
    }
});




module.exports = router;