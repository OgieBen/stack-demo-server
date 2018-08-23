'use strict';

var _express = require('express');

var _Factory = require('../Factory');

var router = (0, _express.Router)();

var factory = new _Factory.Factory();
var auth = factory.getAuth();

router.get('/v1/auth', function (req, res, next) {
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

module.exports = router;
//# sourceMappingURL=auth.js.map
