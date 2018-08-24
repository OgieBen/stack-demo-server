
import { DBHelper } from './data/db/DBHelper';
import { Auth } from './auth/Auth';
import { Answer } from './data/model/Answer';
import { Comment } from './data/model/QComment';

export class Factory {

    constructor() {
        this.db = new DBHelper();
        this.auth = new Auth();       
    }

    getCommentClass() {
        return new Comment();
    }

    getDbc() {
        return this.db;
    }

    getAnswer() {
        return new Answer();
    }

    getAuth() {
        return this.auth;
    }


}