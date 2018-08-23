
import { Answer } from '../data/model/Answer';


export class Auth {

    constructor(){
        
    }

    /**
     * Authenticates users i.e. check if users are registered,
     * then logs them in
     * 
     * @param {String} email 
     * @param {String} passWord 
     * 
     * @returns {Boolean}
     */
    authenticate(email, passWord){
        return false;
    }

    /**
     * Logs user into the platform
     * 
     * @param {String} email 
     * @param {String} password 
     */
    login(email, password){

        if(this.authenticate(email, password)){
            // create user session here:
            return true;
        }
        return false;
    }

    /**
     * Signs user up
     * 
     * @param {String} email 
     * @param {String} password 
     * 
     * @returns {Boolean}
     */
    signUp(email, password){

        if(this.validate(email, password)){
            return this.addUser(email, password);
        }
        return false;
    }

    /**
     * Adds user to database
     * 
     * @param {String} email 
     * @param {String} password 
     * 
     * @returns {Boolean}
     */
    addUser(email, password){
        return false;
    }

    /**
     * Validates parameters 
     * 
     * @param {String} email 
     * @param {String} password 
     * 
     * @returns {Boolean}
     */
    validate(email, password){

        return false;
    }

    testModel() {
        let _answer = new Answer(1, 2, "", "" );   //new Answer(1, 2, "", "" );
        return  _answer.getId();
    }
}




    