
export class QComment {

    constructor(commentId,
         questionId, 
         content, 
         timestamp){

            this._commentId = commentId;
            this._questionId = questionId;
            this._content = content;
            this._timestamp = timestamp
    }

    getQuestionId(){
        return this._questionId;
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