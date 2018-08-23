var express = require('express');
// import DBConnector from '../prod/data/db/DBConnector';
var router = express.Router();
let  connector  = require('../dist/app/prod/data/db/DBConnector');
let auth = require('../dist/app/prod/auth/Auth')
let anwser = require('../dist/app/prod/data/model/Answer')



let _db =  new  connector.DBConnector();
let _auth = new auth.Auth();
let _answer = new anwser.Answer(1,2,"","");

/* GET home page. */
router.get('/', function(req, res, next) {

  // console.log( );
  res.send("Testing Classes " + // typeof express  + "\n"
  + " Anwser Tester : " + _auth.testModel() // _answer.getId() 
  + "\n Db tester: " +  _db.tester() 
  + " \n");
  // res.render('index', { title: 'Express' });
});

module.exports = router;
