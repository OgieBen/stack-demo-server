


export class Answer {

    constructor(id, questionId, userId, date, time) {
        this._id = id;
        this._questionId = questionId;
        this._userId = userId;
        this._date = date;
        this._time = time;     
    }

    getId(){
        return this._id;
    }


    
} 