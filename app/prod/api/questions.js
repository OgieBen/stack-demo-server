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
router.get('/:id', (req, res) => {

    let questionId = parseInt(req.params.id);

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

    let content = req.params.content;
    let userId = req.params.id;

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
router.delete('/:id', (req, res) => {
    
    let questionId = parseInt(req.params.id);
    
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



module.exports = router;