function getQuestions(callback){
        axios({
            method: 'get',
            url: '',
        })
            .then((response) => {
            callback(response);
        })
            .catch((err) => {
            callback(0);
        });
}


function getQuestion(questionId, callback){
    
     axios({
            method: 'get',
            url: '',
        })
            .then((response) => {
            callback(response);
        })
            .catch((err) => {
            callback(0);
        });

}

function getUserDetails(userId, callback){
    
    axios({
            method: 'get',
            url: '',
        })
            .then((response) => {
            callback(response);
        })
            .catch((err) => {
            callback(0);
        });
}


function getAnswers(questionId, callback){
    
    axios({
            method: 'get',
            url: '',
        })
            .then((response) => {
            callback(response);
        })
            .catch((err) => {
            callback(0);
        });
}


function addQuestion(data, callback){
    
    axios({
            method: 'post',
            url: '',
        })
            .then((response) => {
            callback(response);
        })
            .catch((err) => {
            callback(0);
        });
}

function addComment(data, callback) {
    axios({
            method: 'post',
            url: '',
        })
            .then((response) => {
            callback(response);
        })
            .catch((err) => {
            callback(0);
        });
}


function getComments(answerId, callback){
    
    axios({
            method: 'get',
            url: '',
        })
            .then((response) => {
            callback(response);
        })
            .catch((err) => {
            callback(0);
        });
}