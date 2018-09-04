


export class Answer {

    constructor(id, questionId, content, userId, timestamp) {
        this._id = id;
        this._questionId = questionId;
        this._content = content;
        this._userId = userId;
        this._timestamp = timestamp;     
    }

    getId(){
        return this._id;
    }

    getQuestionId() {
        return this._questionId;
    }


    getContent() {
        return this._content;
    }

    getTimestamp() {
        return this._timestamp;
    }

    getUserId(){
        return this._userId;
    }


    
} 