function createQuestionsCard(document){
    
    let card = document.createNode('div');
    
    return card;
}

function createNode(node, document, nodeClasses){
    
    let currentNode = document.createNode(node.toString);
    
    nodeClasses.forEach((claz) => {
        currentNode.addClass(claz);
    });
    
    return currentNode;
}