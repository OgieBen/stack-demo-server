export class User {

    constructor(id, name, email, password){
        this._id = id;
        this._email = email;
        this._password = password;
    }

    getId(){
        return this._id;
    }

    getEmail(){
        return this._email;
    }

    getPassword(){
        return this._password;
    }
}