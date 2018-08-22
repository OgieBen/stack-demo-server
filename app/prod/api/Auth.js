
import answer from '../../bin/data/model/Answer';


export default class Auth {



    testModel() {
        let answer = new Answer(1, 2, "", "" );

        return answer;
    }
}

let auth = new Auth();

console.log(auth.testModel.id)