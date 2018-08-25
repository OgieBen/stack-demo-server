'use strict';

var _express = require('express');

var _Factory = require('../Factory');

var router = (0, _express.Router)();

var factory = new _Factory.Factory();
var auth = factory.getAuth();

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
router.post('/login', function (req, res) {

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

    auth.login('bensoft2k5@gmail.com', 'admi', function (flag) {

        if (flag) {
            res.json({
                msg: true
            });
            return;
        }
        if (flag === 'undefined' || flag == false) {
            res.json({
                msg: false
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
router.post('/signup', function (req, res) {

    // TODO validate and clean user date

    var flag = false;
    auth.signUp("ogie Ben", 'bensoft2k5@gmail.com', 'admin', function (flag) {
        if (flag) {
            res.json({
                msg: true
            });
            return;
        }

        res.json({
            msg: false
        });
    });
});

router.get('/dbsetup/:key', function (req, res) {

    // let key = req.params.key.toString();

    // if (key ===  "123"){

    // set up db
    var result = factory.getDbc().setUpDb();

    if (result) {
        res.json({
            msg: true
        });
    }

    res.json({
        msg: false
    });

    // }
});

module.exports = router;
//# sourceMappingURL=auth.js.map
