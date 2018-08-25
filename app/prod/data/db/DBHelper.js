import pg, { Pool, Client } from 'pg';
import { User } from '../model/User';
import config from 'dotenv'



export class DBHelper {

    constructor() {
        // this.configString = config['PG_CONNECT'];
        this._pool = new Pool({
            user: process.env.USER,
            host: 'localhost',
            database: 'slackdemo',
            password: null,
            port: 5432,
            max: 400,
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
     * 
     * @returns {Boolean}
     */
    query(query, callback) {
        let pool = this
            .getPool();

        pool.query(query.toString(), (err, res) => {
            callback(err, res);
            pool.end();
        });


    }

    /**
     * Executes Queries with config
     * 
     * @param {Callback} errCallback 
     * @param {String} query 
     * @param {Callback} callback 
     * 
     * @returns {Boolean}
     */
    queryWithConfig(query, callback) {
        let pool = this
            .getPool();

        pool.query(query, (err, res) => {
            callback(err, res);
        });

        // pool.end();
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

    setUpDb() {

        /**
         * Users table
         */
        const createUserTable = {
            name: 'create-users-table',
            text: 'CREATE TABLE users ('
                + 'id SERIAL NOT NULL primary key,'
                + 'name varchar(30) NOT NULL,'
                + 'email varchar(30) NOT NULL UNIQUE,'
                + 'password varchar(60) NOT NULL,'
                + 'timestamp timestamp'
                + ');'
                + ''
                // + 'CREATE TABLE answers ('
                // + 'id int primary key,'
                // + 'question_id int ,' // references Question(question_id)
                // + 'content varchar(80),'
                // + 'user_id int references users(user_id),'
                // + 'timestamp timestamp'
                // + ');'
                + '',
            // value: [] 
        }

        /** Question Table */
        const createQuestionQuery = {
            name: 'create-questions-table',
            text: 'CREATE TABLE questions ('
                + 'id SERIAL NOT NULL primary key,'
                + 'accepted_answer_id int,' // 
                + 'content varchar(5000) NOT NULL,'
                + 'user_id int NOT NULL references users(id),'
                + 'timestamp timestamp'
                + ');'
                + '',
            // value: [] 
        }

        const createQuestionCommentQuery = {
            name: 'create-qcomment-table',
            text: 'CREATE TABLE q_comments ('
                + 'id SERIAL NOT NULL primary key,'
                + 'question_id int NOT NULL references questions(id),' // 
                + 'content varchar(5000) NOT NULL,'
                + 'user_id int NOT NULL references users(id),'
                + 'timestamp timestamp'
                + ');'
                + '',
            // value: [] 
        }

        /** Answer Table  */
        /* -------- Answer Table starts here  */
        const createAnswerTable = {
            name: 'create-answers-table',
            text: 'CREATE TABLE answers ('
                + 'id SERIAL NOT NULL primary key,'
                + 'question_id int NOT NULL references questions(id),' // 
                + 'content varchar(5000) NOT NULL,'
                + 'user_id int NOT NULL references users(id),'
                + 'timestamp timestamp'
                + ') ;'
                + '',
            // value: [] 
        }

        const createAnswersCommentTable = {
            name: 'create-acomments-table',
            text: 'CREATE TABLE a_comments ('
                + 'id SERIAL NOT NULL primary key,'
                + 'answer_id int references answers(id),' // 
                + 'content varchar(5000),'
                + 'user_id int references users(id),'
                + 'timestamp timestamp'
                + ');'
                + '',
        }




        let pool = this
            .getPool();

        let flag = false;

        pool.query(createUserTable, (err, res) => {
            if (err) {
                console.error(err.stack);
                console.log("Error setting up UserTable");
                return;
            }
            console.log("UserTable was set up succesfully");

            pool.query(createQuestionQuery, (err, res) => {
                if (err) {
                    console.error(err.stack);
                    console.log("Error setting up QuestionQuery");
                    return;
                }

                console.log("QuestionQuery was set up succesfully");
                pool.query(createQuestionCommentQuery, (err, res) => {
                    if (err) {
                        console.error(err.stack);
                        console.log("Error setting up QuestionCommentQuery");
                        return;
                    }

                    console.log("QuestionCommentQuery was set up succesfully");
                    pool.query(createAnswerTable, (err, res) => {
                        if (err) {
                            console.error(err.stack);
                            console.log("Error setting AnswerTable");
                            return;
                        }

                        console.log("AnswerTable was set up succesfully");
                        pool.query(createAnswersCommentTable, (err, res) => {
                            if (err) {
                                console.error(err.stack);
                                console.log("Error setting AnswersCommentTable");
                                flag = false;
                                return;
                            }
                            flag = true;
                            // pool.end();
                            console.log("AnswersCommentTable was set up succesfully");
                            console.log("Database was set up succesfully");
                        })
                    });

                });
            });

        });


        return flag;

    }

    dropTables(...tableNames) {

        let text = 'DROP TABLE ';
        let pool = this.getPool();

        for (let i = 0; i < tableNames.length; i++) {
            if (i === (tableNames.length - 1)) {
                text = text + `$${i}`;
            } else {
                text = text + `$${i},`;
            }
        }

        const query = {
            name: 'drop-tables',
            text: text.toString(),
            value: tableNames
        }

        pool.query(query, (err, res) => {
            if (err) {
                console.error(err.stack);
            }

            console.log('Tables were removed successfully');
        });



    }

    end() {
        this
            ._pool
            .end();
    }

    getPool() {
        return this._pool;
    }


    



    tester() {
        return `Testing DBConncter! `;
        // ${config['PG_CONNET']}
    }


}