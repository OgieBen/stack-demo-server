let express = require('express');
// import DBConnector from '../prod/data/db/DBConnector';
let router = express.Router();
let  connector  = require('../dist/app/prod/data/db/DBHelper');
let auth = require('../dist/app/prod/auth/Auth');




let _db =  new  connector.DBHelper();
let _auth = new auth.Auth();


/* GET home page. */
router.get('/', function(req, res, next) {

  // console.log( );
  res.send("Testing Classes "
  + " Anwser Tester : " + _auth.testModel() // _answer.getId() 
  + "\n Db tester: " +  _db.tester() 
  + " \n");
  // res.render('index', { title: 'Express' });
});

module.exports = router;
