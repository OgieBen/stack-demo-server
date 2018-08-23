
export class QComment {

    constructor(commentId,
        questionId,
        userId,
        content,
        timestamp) {

        this._commentId = commentId;
        this._questionId = questionId;
        this._content = content;
        this._userId = userId;
        this._timestamp = timestamp
    }

    getQuestionId() {
        return this._questionId;
    }

    getCommentId() {
        return this._commentId;
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