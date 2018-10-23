
import { Answer } from '../data/model/Answer';
// import { Factory } from '../Factory';
import { DBHelper } from '../data/db/DBHelper';
import crypto from 'crypto';
import { detect } from 'detect-browser';

const browser = detect();

export class Auth {




    constructor() {
        // this._factory = new Factory();
        this._dbc = new DBHelper();
    }


    getDb() {
        return this._dbc;
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
    authenticate(email, password, callback) {
        // let flag = false;
        const fetchUserQuery = {
            name: 'fetch-user',
            text: 'SELECT * FROM users WHERE email = $1 AND  password = $2 ',
            values: [email.toString(), password.toString()],
        };

        if (this.validate(email, password)) {

            this
                .getDb()
                .queryWithConfig(fetchUserQuery, (err, result) => {
                    if (err) {
                        console.error(err.stack);
                        console.log("Authentication failure");
                        callback(false);
                        return;
                    }

                    const resultLength = result.rows.length;
                    console.log(email + password);

                    if (result.rows.length === 1) {
                        let status = true;
                        console.log("Authentication success");
                        callback(status, result.rows);

                        result.rows.forEach((user) => {
                            console.log(user);
                        });
                        return;
                    }

                    console.log("Authentication failure: Invalid User " + resultLength);
                    callback(false, 0);

                });
        }
    }

    /**
     * Adds user to database
     * 
     * @param {String} email 
     * @param {String} password 
     * 
     * @returns {Boolean}
     */
    addUser(name, email, password, callback) {
        // let flag = false;

        const addUserQuery = {
            name: 'add-user',
            text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3)',
            values: [name, email, password],

        };

        this
            .getDb()
            .queryWithConfig(addUserQuery, (err, result) => {
                if (err) {
                    console.log("Could not sign up user");
                    callback(false);
                    console.error(err.stack);
                    return;
                }

                console.log("Added User sucessfully");


                // signs user in and creates a session
                this.login(email, password, (flag, data) => {
                    callback(flag, data);
                });
            });
    }

    /**
     * Logs user into the platform
     * 
     * @param {String} email 
     * @param {String} password 
     */
    login(email, password, callback) {

        // let flag = false;

        this.authenticate(email, password, (flag, data) => {
            if (flag) {
                console.log("Login was sucessful");
            }
            callback(flag, data);
        });

    }

    /**
     * Signs user up
     * 
     * @param {String} name
     * @param {String} email 
     * @param {String} password 
     * 
     * @returns {Boolean}
     */
    signUp(name, email, password, callback) {

        if (this.validate(name, email, password)) {
            return this.addUser(name, email, password, (flag, data) => {
                if (flag) {
                    callback(flag, data);
                    return;
                }
                callback(false);
            });
        }

        callback(false);

    }


    /**
     * Validates parameters 
     * 
     * @param {String} email 
     * @param {String} password 
     * 
     * @returns {Boolean}
     */
    validate(name, email, password) {

        return true;
    }


    createFootprint(email, password) {

        const footPrint = email + password + browser.name + browser.os + browser.version;
        const cipher = crypto.createCipher('aes192', process.env.salt);
        
        let encrypted = cipher.update(footPrint, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    checkUserSession(){

       /*  const decipher = crypto.createDecipher('aes192', process.env.salt);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8'); */

        console.log("Decrypted: " + decrypted);
    }


    testModel() {
        let _answer = new Answer(1, 2, "", "");   //new Answer(1, 2, "", "" );
        return _answer.getId();
    }
}




