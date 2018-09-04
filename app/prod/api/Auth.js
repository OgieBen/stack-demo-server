import { Router } from 'express';
import { Factory } from '../Factory';


// config();
let router = Router();


let factory = new Factory();
let auth = factory.getAuth();



/**
 *  This endpoint authenticates a user using th user's password and email 
 *  (Note: change method from get to post)
 *  PAYLOAD:
 * @method POST
 * @param String email
 * @param String password
 * 
 * @returns JSON
 */
router.post('/login', (req, res) => {

    let email = req.body.email.toString();
    let name = req.body.name.toString();

    auth.login(email, name, (flag) => {
        if (flag) {
            res.json({
                msg: true,
            });
            return;
        }
        if (flag === 'undefined' || flag == false) {
            res.json({
                msg: false,
            });
        }

    });

});

/**
 * This endpoint create a user account
 * 
 * @method POST
 * 
 * @param String email
 * @param String password
 * 
 * @return JSON 
 */
router.post('/signup', (req, res) => {

    // TODO validate and clean user date

    let name = req.body.name.toString();
    let email = req.body.email.toString();
    let password = req.body.password.toString();

    console.log(`parameters: ${name, email, password}`);

    auth
        .signUp(name, email, password, (flag) => {
            if (flag) {
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

router.get('/dbsetup/:key', (req, res) => {

    // let key = req.params.key.toString();

    // if (key ===  "123"){

    // set up db
    let result = factory
        .getDbc()
        .setUpDb();

    if (result) {
        res.json({
            msg: true,
        });
    }

    res.json({
        msg: false,
    });


    // }
});




module.exports = router;
