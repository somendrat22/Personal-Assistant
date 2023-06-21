const express = require('express');
const router = express.Router();
const Buffer = require('buffer').Buffer;
const axios = require('axios');

const clientId = 'bLNa2YiVTbqwV78kLLvHg';
const clientSecret = 'cDdcAvp81U06pSGBRH8dC1MSyF77427d';

// Concatenate client ID and client secret with a colon separator
const credentials = `${clientId}:${clientSecret}`;

// Encode the credentials using Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

console.log(encodedCredentials);



router.get('/', async (req, res) => {
    try{
        const resp =  await axios.post("https://zoom.us/oauth/token", {}, {
            params : {
                grant_type : "account_credentials", 
                account_id : "EDgWG6WiSMilbo7wiLrirg"
            }, 
            
            headers : {
                Authorization : "Basic " +  encodedCredentials
            }
        }
        )
        console.log(resp);
        res.send(resp.data);
    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
    
})

module.exports = router;