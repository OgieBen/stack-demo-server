
import { DBHelper } from './db/DBHelper';


export class Repo {


    constructor() {
        this._db = new DBHelper();
    }


    addAnswer(questionId, content, userId, callback) {

        // TODO: MAKE INSERT QUERY A TRANSACTION
        const query = {
            name: 'fetch-answers',
            text: 'INSERT INTO answers(question_id, content, user_id) VALUES($1, $2, $3);',
            values: [questionId, content, userId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Error adding question : \n");
                    console.error(err.stack);
                    return;
                }

                this.updateAnswerTotalCount(questionId, (status) => {
                        callback(status);
                });

                // true means query ran right;
                // callback(true);
            });
    }

    addQuestion(content, userId, callback) {

        const query = {
            name: 'fetch-questions',
            text: 'INSERT INTO questions(content, user_id) VALUES($1, $2);',
            values: [content, userId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Error adding question : \n");
                    console.error(err.stack);
                    return;
                }

                console.log(res.rows);

                // true means query ran right;
                callback(true);
            });
    }

    deleteQuestion(questionId, callback) {
        const query = {
            name: 'delete-questions',
            text: 'DELETE FROM questions where id = $1;',
            values: [questionId]
        }

        //'DELETE FROM questions where id = $1;', //'DELETE FROM questions where id = $1 AND user_id = $2;',
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Error deleting question : \n");
                    console.error(err.stack);
                    return;
                }

                // true means query ran right;
                console.log("Delete was Succesful");
                callback(true);
            });
    }

    fetchAllQuestions(callback) {

        const query = {
            name: 'fetch-all-questions',
            text: 'SELECT * from questions',
            values: [],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Error fetching questions");
                    return;
                }

                callback(res.rows);
            });
    }

    fetchQuestion(questionId, callback) {
        const query = {
            name: 'fetch-question',
            text: 'SELECT * from questions where id = $1',
            values: [questionId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Error fetching question");
                    return;
                }

                callback(res.rows);
            });
    }

    fetchAnswers(questionId, callback) {
        const query = {
            name: 'fetch-answer',
            text: 'SELECT * from answers where question_id = $1',
            values: [questionId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Error fetching question");
                    return;
                }

                callback(res.rows);
            });
    }

    isUserAnswerOwner(userId, answerId, callback) {

        const query = {
            name: 'fetch-answer',
            text: 'SELECT * from answers where id = $1',
            values: [answerId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Error fetching question");
                    return;
                }
                if (res.rows.length === 1) {
                    if (res.rows[0].user_id == userId) {
                        callback(true);
                        return;
                    }
                }
                callback(false);
            });
    }

    setAcceptedAnswer(questionId, answerId, callback) {

        const query = {
            name: 'set-questions-answer',
            text: 'UPDATE questions SET accepted_answer_id= $1 WHERE id = $2',
            values: [answerId, questionId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Update was not succesful : \n");
                    console.error(err.stack);
                    return;
                }

                // true means query ran right;
                callback(true);
            });
    }

    updateAnswer(answerId, content, callback) {
        const query = {
            name: 'set-questions-answer',
            text: 'UPDATE answers SET content = $1 WHERE id = $2',
            values: [content, answerId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Update was succesful : \n");
                    console.error(err.stack);
                    return;
                }

                // true means query ran right;
                callback(true);
            });
    }

    fetchQuestionWithHighestAnswers(callback) {
        const query = {
            name: 'fetch-top-questions',
            text: 'SELECT * from questions ORDER BY total_answers DESC ',
            // values: [],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Error fetching question");
                    return;
                }

                callback(res.rows.length);
            });
    }

    fetchAllUserQuestions(userId, callback) {
        const query = {
            name: 'fetch-all-user-questions',
            text: 'SELECT * from questions where user_id = $1',
            values: [userId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Error fetching question");
                    return;
                }

                callback(res.rows);
            });
    }

    addCommentToAnwser(answerId, content, userId, callback) {
        const query = {
            name: 'add-answer-comment',
            text: 'INSERT INTO a_comments(answer_id, content, user_id) VALUES($1, $2, $3);',
            values: [answerId, content, userId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Error adding comment : \n");
                    console.error(err.stack);
                    return;
                }

                // true means query ran right;
                callback(true);
            });
    }




    /* upvote and downvotes */
    upvoteAnswer(answerId, callback) {
        const query = {
            name: 'update-questions-upvote',
            text: 'UPDATE answers SET up_vote = ((SELECT up_vote from answers where id = $1) + 1) WHERE id = $1;',
            values: [answerId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Upvote was not succesful : \n");
                    console.error(err.stack);
                    return;
                }

                // true means query ran right;
                callback(true);
            });


    }

    downVoteAnswer(answerId, callback) {

        const query = {
            name: 'update-answers-downvote',
            text: 'UPDATE answers SET down_vote = ((SELECT down_vote from answers where id = $1) + 1) WHERE id = $1;',
            values: [answerId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Downvote was not succesful : \n");
                    console.error(err.stack);
                    return;
                }

                // true means query ran right;
                callback(true);
            });

    }

    /* search */
    searchForQuestions(questionString, callback) {
        const query = {
            name: 'search-questions',
            text: 'SELECT * FROM questions WHERE to_tsvector(content) @@ to_tsquery($1)',
            values: [questionString],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    console.log("Error fetching question");
                    console.error(err.stack);
                    callback(false);
                    return;
                }

                callback(res.rows);
            });
    }

    updateAnswerTotalCount(questionId, callback) {
        const query = {
            name: 'update-answers-downvote',
            text: 'UPDATE questions SET total_answers = ((SELECT total_answers from questions where id = $1) + 1) WHERE id = $1;',
            values: [questionId],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if (err) {
                    callback(false);
                    console.log("Total count update not succesful : \n");
                    console.error(err.stack);
                    return;
                }

                // true means query ran right;
                callback(true);
            });
    }

    addCommentToQuestion() {

    }





}