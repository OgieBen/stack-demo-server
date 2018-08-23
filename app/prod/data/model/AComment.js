
export class AComment {

    constructor(commentId,
        answerId,
        userId,
        content,
        timestamp) {

        this._commentId = commentId;
        this._answerId = answerId;
        this._userId = userId,
        this._content = content;
        this._timestamp = timestamp
    }
    getAnswerId() {
        return this._answerId;
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

    getUserId() {
        return this._userId;
    }
}