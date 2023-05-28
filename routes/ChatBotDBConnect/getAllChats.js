const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({
    region : 'ap-south-1',
    accessKeyId : 'AKIA2OFMX4GA6UUHXINT',
    secretAccessKey : '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'
})

const dynamoDb = new AWS.DynamoDB();





router.get('/', async(req, res) => {
    const uid = req.query.uid;
    console.log(uid);
    const params = {
        TableName : "PersonalAIdatasets",
        KeyConditionExpression : 'UserID = :id',
        ExpressionAttributeValues : {
            ":id" : {"S" :uid}
        }
    }

    try{
        dynamoDb.query(params, (err, data) => {
            if(err){
                res.status(400).send(err);
            }else{
                res.send(data.Items[0].ChatBotConvo.L);
            }
        })
    }catch(error){
        res.status(500).send("An Error Occured");
    }
})

module.exports = router;