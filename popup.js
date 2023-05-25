document.addEventListener("DOMContentLoaded", function(){
    var generateResponseButton = document.querySelector(".generate-response");
    generateResponseButton.addEventListener("click", function(){
        generateResponseButton.style.backgroundColor = "red";
        chrome.extension.sendMessage({action  : "buttonClicked", data : "dance"});
    })
})


