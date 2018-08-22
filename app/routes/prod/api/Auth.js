
import Answer from '../../bin/data/model/Answer';
import Auth from './Auth';

export default Auth {



    testModel() {
        let answer = new Answer(1, 2, "", "" );

        return answer;
    }
}

let auth = new Auth();

console.log(auth.testModel.id)