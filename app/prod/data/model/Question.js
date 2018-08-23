
export class Question {

    constructor(
        questionId,
        userId,
        acceptedAnswerId,
        content,
        timestamp) {

        this._questionId = questionId;
        this._content = content;
        this._acceptedAnswerId = acceptedAnswerId;
        this._userId = userId;
        this._timestamp = timestamp;
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

    getAcceptedAnswerId(){
        return this._acceptedAnswerId;
    }

}