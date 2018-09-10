let url = '/api/v1/';
//let url = 'localhost:3000/api/v1/';

function login(data, callback){
    axios({
            method: 'post',
            url: url + 'auth/login',
        data: data,
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });
}

function signUp(data, callback){
    axios({
            method: 'post',
            url: url + 'auth/signup',
        data: data,
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });
}



function getQuestions(callback) {
    axios({
            method: 'get',
            url: url + 'questions',
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });
}

function getAllUserQuestions(userId, callback) {
    axios({
            method: 'get',
            url: url + `questions/all/${userId}`,
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });
}


function getQuestion(questionId, callback) {

    axios({
            method: 'get',
            url: url + `questions/${questionId}`,
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });

}

function getUserDetails(userId, callback) {

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


function getAnswers(questionId, callback) {

    axios({
            method: 'get',
            url: url + `questions`,
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });
}


function addQuestion(data, callback) {

    axios({
            method: 'post',
            url: url + 'questions',
            data: data,
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });
}


function addAnswer(questionId, data, callback) {

    axios({
            method: 'post',
            url: url + `questions/${questionId}/answers`,
            data: data,
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });
}

function addComment(data, questionId, answerId, callback) {
    axios({
            method: 'post',
            url: `/api/v1/questions/${questionId}/answers/${answerId}/comments`,
            data: data,
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });
}

function getUser(userId, callback) {
    axios({
            method: 'get',
            url: url + `questions/user/${userId}`,
            data: {
                userId: userId
            },
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });
}

function getUserAnswersCount(userId, callback) {
    axios({
            method: 'get',
            url: url + `questions/answers/count/${userId}`,
            data: {
                userId: userId
            },
        })
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            callback(0);
        });
}


function getComments(answerId, callback) {

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
