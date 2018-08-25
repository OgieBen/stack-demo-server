import { Router } from 'express';
import { Factory } from '../Factory';

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
 * Adds a question the platform
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
            })
        });
});

/**
 * Removes a question from the platform
 * 
 * @method DELETE
 */
router.delete('/:questionId', (req, res) => {
    
    let questionId = parseInt(req.params.questionId);
    
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
            })
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
    let userId = parseInt(res.body.userId);
    
    repo
        .addAnswer(questionId, content,  userId, (result) => {
            if (result) {

                console.log(result);
                res.json({
                    msg: true,
                });
                return;
            }
            res.json({
                msg: false,
            })
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
router.put('/:questionId/anwsers/:anwserId', (req, res) => {
    // use flag to check if incoming request is an update 
    // if it is an update, update the answer entry

    let questionId = parseInt(req.body.questionId);
    let answerId = parseInt(req.body.anwserId);
    let accept = req.body.resolve;
    let userId = parseInt(req.body.userId);

    // if accept is true
    // and user id is of owner
    // mark answer as accepted
    if(accept){
        repo
            .isUserAnwersOwner(userId, answerId, (status) => {
                    if(status){
                        // accept awnser;
                        repo.setAcceptedAnswer(questionId, answerId, (status) => {
                            if(status){
                                console.log('Answer was successful updated');
                                res.json({
                                    msg: true,
                                });
                            }
                        });
                    }
            });

        }
        
        let content = req.body.answer;
        repo.updateAnswer(answerId, content, ()=>{

        });



    // if user is owner

    




});



module.exports = router;