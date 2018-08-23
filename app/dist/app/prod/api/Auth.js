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
router.get('/v1/auth', function (req, res, next) {

    // TODO: gets user details here

    if (auth.login()) {
        res.json({
            msg: 'success'
        });
        return;
    }

    res.json({
        msg: 'false ' + auth.login()
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
router.get('/v1/signup', function (req, res, next) {

    // TODO validate and clean user date


});

module.exports = router;
//# sourceMappingURL=auth.js.map
