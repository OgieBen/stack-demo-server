
export class Question {

    constructor(
        questionId,
        userId,
        content,
        timestamp) {

        this._questionId = questionId;
        this._content = content;
        this._userId = userId;
        this._timestamp = timestamp
    }

    getQuestionId() {
        return this._questionId;
    }


    getContent() {
        return this._content
    }

    getTimestamp() {
        return this._timestamp;
    }

    getUserId(){
        return this._userId;
    }

}