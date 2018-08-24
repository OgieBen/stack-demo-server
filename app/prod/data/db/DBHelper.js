import pg, { Pool, Client } from 'pg';
import { User } from '../model/User';
import config from 'dotenv'



export class DBConnector {

    constructor() {
        // this.configString = config['PG_CONNECT'];
        this._pool = new Pool({
            user: '',
            host: '',
            database: '',
            password: '',
            port: 3211,
        });

    }

    // callback takes client object
    /* _connect(err, callback){
        pg.connect(this.configString, (err, client, done) => {
                
            if(err){
                    err();
                    return;
                }
            callback(client);
            done()
            return

        });
    } */

    /**
     * Executes Queries
     * 
     * @param {Callback} errCallback 
     * @param {String} query 
     * @param {Callback} callback 
     */
    query(errCallback, query, callback) {

        this
            .getPool()
            .query(query.toString(), (err, res) => {
                // console.log(err, res)
                if (err) {
                    errCallback();
                    return false;
                }

                callback()
                pool.end()
            });
    }


    /**
     * Adds a user to database
     * 
     * @param {User} user 
     * 
     * @returns {Boolean}
     */
    addUser(user) {
        if (!user instanceof User) {
            return false;
        }
        return false;
    }


    getPool() {
        return this._pool;
    }


    fetchAllQuestions() {

    }

    fetchQuestion() {

    }

    fetchAnswers() {

    }

    fetchQuestionWithHighestAnswers() {

    }

    fetchUserQuestions() {

    }

    addCommentToAnwser() {

    }

    addCommentToQuestion() {

    }

    upvoteAnswer() {

    }

    downVoteAnswer() {

    }

    searchForAnswers() {

    }

    deleteQuestion() {

    }




    tester() {
        return `Testing DBConncter! `;
        // ${config['PG_CONNET']}
    }


}