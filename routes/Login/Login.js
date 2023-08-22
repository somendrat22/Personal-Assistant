const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

const secretKey = "Somendrat22";

AWS.config.update({
    region : 'ap-south-1',
    accessKeyId : 'AKIA2OFMX4GA6UUHXINT',
    secretAccessKey : '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'
})

const dynamoDb = new AWS.DynamoDB();

const docClient = new AWS.DynamoDB.DocumentClient({
    // optional tuning - 50% faster(cold) / 20% faster(hot)
    apiVersion: '2012-08-10',
    sslEnabled: false,
    paramValidation: false,
    convertResponseTypes: false
});


router.post("/", async (req, res ) => {
    console.log(req.body);
    const email = req.body.Email;
    const password = req.body.Password + "";
    const fieldName = 'Email'
    const params = {
        TableName: 'PersonalAIdatasets',
        
        
    }
    try{
        let items = await docClient.scan(params).promise();
        let user = items.Items.filter((obj) => {
            return obj.Email == email;
        })
        
        if(user.length >= 1 && user[0].Password.localeCompare(password)){
            user[0].exp = Math.floor(Date.now() / 1000) + 3600;
            const token = jwt.sign(user[0], secretKey);
            res.status(201).send({
                "token" :  token
            });
        }else{
            res.status(401).send({
                "message" : "Not Authorized"
            })
        }

        
    }catch(err){
        res.status(500).send(err);
    }
}) 


module.exports = router;
