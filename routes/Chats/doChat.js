const express = require('express');
const router = express.Router();
const aiModelURL  = 'https://api.openai.com/v1/chat/completions';
// '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'
// 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
// const apiKey = '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'; efe key
const apiKey = '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';
const axios  = require('axios');
let messgaeInput = [];

router.get('/', async (req, res) => {
    console.log(req.query.text);
    let mssgObj = {
        "role" : "user", 
        "content" : `${req.query.text}`
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

        messgaeInput.push(resposne.data.choices);
        //console.log(resposne.data.choices);
        res.send(resposne.data.choices);
    }catch(error){1
        //console.log('Error : ', error);
        res.status(500).send(error);
    }
    
}); 

module.exports = router;