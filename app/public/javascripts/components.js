let apiUrl =  '/api/v1/';

function createElement(child, elementClasses) {

    let currentNode = document.createElement(child);
    elementClasses.forEach((claz) => {
        currentNode.className += " " + claz;
    });
    return currentNode;
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/* UI Modifiers*/

function clearText(ref) {
    ref.value = "";
}

function hide(ref) {
    ref.style.display = 'none';
}

function show(ref) {
    ref.style.display = 'flex';
}

function click(ref, callback) {
    ref.addEventListener('click', () => {
        callback();
    });
}

function setProfilePageLink(tag, userId){
    tag.href = `/profile?id=${userId}`;
    /*profileLinkATag.href = `/profile?id=${userId}`;
    questionsLinkATag.href = `/profile?id=${userId}`; */
}

function setQuestionPageLink(tag, userId){
    tag.href = `/u/${userId}`;
}

function displayAnswer(answerObject) {

    let answersCardHolder = document.getElementById('answers-card-holder');

    let answersCardClasses = ['answer-card', 'container card', 'br-regular', 'col-xs-11', 'col-sm-11', 'col-md-12', 'col-lg-11', 'col-xl-11', 'shadow-dim', 'flex-wrap', 'mg-b-10'];

    let answerContentClasses = ['col-8', 'container'];
    let contentPTagClasses = ['pd-10', 'condensed-sans-font'];

    /* hold questions */
    let answerCard = createElement('div', answersCardClasses);

    /* Holds upvote and down vote icons*/
    let voteIconsHolder = createElement('div', ['container', 'vote-section', 'col-2', 'center-box-vertical', 'flex-direction-column']);

    /* Answer Content tags */
    let answerContent = createElement('div', answerContentClasses);
    let contentPTag = createElement('p', []);

    /* a tags */
    let upVoteATag = createElement('a', ['container', 'align-content-center', 'center-box-horizontal', 'col-4']);
    let centerDotATag = createElement('a', [' container align-content-center center-box-horizontal', 'col-4']);
    let downVoteATag = createElement('a', ['container', 'align-content-center', 'center-box-horizontal', 'col-4']);


    /* img tags */

    let upVoteImgTag = createElement('img', []);
    let centerDotImgTag = createElement('img', []);
    let downVoteImgTag = createElement('img', []);


    /* Bottom metrics */
    let metricsDiv = createElement('div', ['dosis-font', 'col-12', 'pd-10 container']);

    let leftDiv = createElement('p', ['col-4']);
    let centerDiv = createElement('p', ['col-4']);
    let rightDiv = createElement('p', ['col-4']);

    let leftP = createElement('p', ['align-text-center']);
    let centerP = createElement('p', ['align-text-center']);
    let rightP = createElement('p', ['align-text-center']);



    /* set img src attribute*/

    upVoteImgTag.src = "../images/icons/votes/baseline-keyboard_arrow_up-black-18/2x/baseline_keyboard_arrow_up_black_18dp.png";

    centerDotImgTag.src = "../images/icons/baseline-fiber_manual_record-black-18/1x/baseline_fiber_manual_record_black_18dp.png";

    downVoteImgTag.src = "../images/icons/votes/baseline-keyboard_arrow_down-black-18/2x/baseline_keyboard_arrow_down_black_18dp.png";

    /* set upvote a tag*/
    
  
    
    let upVoteUrl =  apiUrl + `questions/${answerObject.question_id}/answers/${answerObject.id}/upvote`;
    
    let downVoteUrl = apiUrl + `questions/${answerObject.question_id}/answers/${answerObject.id}/downvote`;
    
    let answerId = answerObject.id;
    
      console.log(upVoteUrl);
    
    upVoteATag.href= '';
    upVoteATag.title= 'upvote answer';
    downVoteATag.href= '';
    downVoteATag.title= 'downvote answer';

    upVoteATag.addEventListener('click', (event) => {
        event.preventDefault();

        axios({
            method: 'put',
            url: upVoteUrl,
            headers: {'Access-Control-Allow-Origin': '*'},
            data: {
                 answerId,
            },
        }).then((res) => {
            if(res.data.msg){
                alert("success");
                return;
            }
            alert("Could not upvote answer");
        }).catch((e) => {
            alert('Error upvoting post' + e);
            console.log(e);
        });
    });
    
    
    downVoteATag.addEventListener('click', (event) => {
        event.preventDefault();
        
        axios({
            method: 'put',
            url: downVoteUrl,
            headers: {'Access-Control-Allow-Origin': '*'},
            data: {
                 answerId,
            },
        }).then((res) => {
            if(res.data.msg){
                alert("success");
                return;
            }
            alert("Could not upvote answer");
        }).catch((e) => {
            alert('Error upvoting post' + e);
            console.log(e);
        });
    });
   


    /*append img to a tag*/
    upVoteATag.appendChild(upVoteImgTag);
    centerDotATag.appendChild(centerDotImgTag);
    downVoteATag.appendChild(downVoteImgTag);

    voteIconsHolder.appendChild(upVoteATag);
    voteIconsHolder.appendChild(centerDotATag);
    voteIconsHolder.appendChild(downVoteATag);

    /* add question content*/
    contentPTag.append(document.createTextNode(answerObject.content));
    answerContent.appendChild(contentPTag);

    /* add bottom metrics*/
    leftP.append(document.createTextNode("answered by: " + answerObject.name));
    leftDiv.appendChild(leftP);

    centerP.append(document.createTextNode("upvotes: " + answerObject.up_vote));
    centerDiv.appendChild(centerP);

    rightP.append(document.createTextNode("downvotes: " + answerObject.down_vote));
    rightDiv.appendChild(rightP);

    metricsDiv.appendChild(leftDiv);
    metricsDiv.appendChild(centerDiv);
    metricsDiv.appendChild(rightDiv);


    /* add elements to card*/
    answerCard.appendChild(voteIconsHolder);
    answerCard.appendChild(answerContent);
    answerCard.appendChild(metricsDiv);


    /* append to answers card holder*/
    answersCardHolder.appendChild(answerCard);


}
