var messageBox = [];
var currMessageBoxData;
function getMailData(){
    var composeButton = document.querySelector(".T-I.T-I-KE.L3");
    console.log(composeButton);
    console.log("Got Compose Button" + composeButton);
    if(composeButton){
        console.log("Adding event listner compose button");
        composeButton.addEventListener("click", function(){
            console.log("Getting compose text area");
            setTimeout(getComposeTextArea, 10000);
        })
    }
}

function getComposeTextArea(){
    var composeTextArea = document.querySelector(".Ar.Au");
    console.log(composeTextArea);
    console.log(composeTextArea.id);
    messageBox.push(composeTextArea);
    composeTextArea.addEventListener("click", function(){
        console.log(`Event listener added on composeTextArea whoose id is ${messageBox.length - 1}`);
        var innerDiv = composeTextArea.children;
        currMessageBoxData = innerDiv[0];
        console.log(innerDiv[0].textContent);
    })
}

console.log("Calling Method");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.action  == "getMailData"){
        chrome.runtime.sendMessage({action : "mailData", data : currMessageBoxData.textContent});
    }
})

setTimeout(getMailData, 20000)
