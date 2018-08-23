import  { Router } from 'express';
import { Factory } from '../Factory';

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
router.get('/v1/auth/login', (req, res, next ) => {

    // TODO: gets user details here
    
    if(auth.login()){
        res.json({
            msg: true,
        })
        return;
    }

    res.json({
        msg: false,
    })
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
router.get('/v1/auth/signup', (req, res, next) => {

    // TODO validate and clean user date
    if (auth.signUp()){
        res.json({
            msg: true,
        })
        return;
    }

    res.json({
        msg: false
    })

})

module.exports = router;
