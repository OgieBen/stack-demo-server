'use strict';

var _express = require('express');

var _Factory = require('../Factory');

// config();
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

    var email = req.body.email.toString();
    var name = req.body.name.toString();

    auth.login(email, name, function (flag) {
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

    var name = req.body.name.toString();
    var email = req.body.email.toString();
    var password = req.body.password.toString();

    console.log('parameters: ' + (name, email, password));

    auth.signUp(name, email, password, function (flag) {
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
//# sourceMappingURL=Auth.js.map
