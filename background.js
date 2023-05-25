

console.log("Hii")
chrome.extension.onMessage.addListener(async function(request, sender, sendResponse){
    if(request.action == "buttonClicked"){
        //chrome.tabs.query({active : true, currentWindow: true}, function(tabs){
            chrome.runtime.sendMessage({action : "getMailData", data : "Hii Generating Response"});
        //})
    }
    if(request.action  == "mailData"){
        try{
            const params = new URLSearchParams({
                text : request.data
            })
            console.log(request.data);
            const url = `http://localhost:8001/api/modelconnect?text=${request.data}`;
            console.log(url);
            const resp = await fetch(url);
            const data = await resp.json();
            console.log(data);
        }catch(error){
            console.log(error);
        }
        console.log(request.data);
    }
})