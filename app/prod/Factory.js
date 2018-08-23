
import { DBConnector } from './data/db/DBConnector';
import { Auth } from './auth/Auth';
import { Answer } from './data/model/Answer';
import { Comment } from './data/model/QComment';

export class Factory {

    constructor() {
        this.dbC = new DBConnector();
        this.auth = new Auth();       
    }

    getCommentClass() {
        return new Comment();
    }

    getdbC() {
        return this.dbC;
    }

    getAnswer() {
        return new Answer();
    }

    getAuth() {
        return this.auth;
    }


}