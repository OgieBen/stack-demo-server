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
router.get('/login', (req, res, next ) => {

    // TODO: gets user details here
    

        /* factory
            .getDbc()
            .query( 'SELECT NOW()',
                (err, _result) => {
                    if(err){
                        console.log("\nDb Error: " + err.stack);
                        return false;
                    }
                 
                     _result
                        .rows
                        .forEach((obj) => {
                            console.log(obj);
                        }) 
                    console.log("\nResult Lenght "+_result.rows.length);
                }); */

    auth.login('bensoft2k5@gmail.com', 'admi', (flag) => {

                if(flag){
                    res.json({
                        msg: true,
                    });
                 return;
                }
                if(flag === 'undefined' || flag == false){
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
router.get('/signup', (req, res, next) => {

    // TODO validate and clean user date

    let flag = false;
    auth
        .signUp("ogie Ben", 'bensoft2k5@gmail.com', 'admin', (flag) => {    
            if(flag){
                    res.json({
                        msg: true,
                    })
                    return;
                }

            res.json({
                msg: false,
            })
        });

})

router.get('/dbsetup/:key', (req, res, next)=> {

    // let key = req.params.key.toString();

    // if (key ===  "123"){
       
        // set up db
        let result =  factory 
                        .getDbc()
                        .setUpDb();

        if (result){
            res.json({
                msg: true,
            });
        }

        res.json({
            msg: false,
        });
        
        
    // }
})

module.exports = router;
