
export class AComment {

    constructor(commentId,
         answerId, 
         content, 
         timestamp) {

            this._commentId = commentId;
            this._answerId = answerId;
            this._content = content;
            this._timestamp = timestamp
    }
    getAnswerId(){
        return this._answerId;
    }

    getCommentId(){
        return this._commentId;
    }

    getContent(){
        return this._content
    }

    getTimestamp(){
        return this._timestamp;
    }
}