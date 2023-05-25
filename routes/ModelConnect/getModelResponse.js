const express = require('express');
const router = express.Router();
const aiModelURL  = 'https://api.openai.com/v1/chat/completions';
// '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'
const apiKey = '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';
const axios  = require('axios');
const messgaeInput = [];
router.get('/', async (req, res) => {
    console.log(req.query.text);
    let mssgObj = {
        "role" : "user", 
        "content" : `Paraphase the following english text : ${req.query.text}`
    };
    messgaeInput.push(mssgObj);
    try{
        const resposne = await axios.post(aiModelURL, {
            model : "gpt-3.5-turbo",
            messages : messgaeInput
        }, {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${apiKey}`
            }
        })
        //console.log(resposne.data.choices);
        res.send(resposne.data.choices);
    }catch(error){
        //console.log('Error : ', error);
        res.status(500).send('An Error Occured');
    }
    
}); 

module.exports = router;