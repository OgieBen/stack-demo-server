
import { DBHelper } from './db/DBHelper';


export class Repo {


    constructor(){
        this._db = new DBHelper();
    }

    fetchAllQuestions(callback) {

        const query = {
            name: 'fetch-questions',
            text: 'SELECT * from questions',
            values: [],
        }
        this
            ._db
            .queryWithConfig(query, (err, res) => {
                if(err){
                    callback(false);
                    console.log("Error fetching questions");
                    return;
                }

                callback(res.rows);
            });
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

}