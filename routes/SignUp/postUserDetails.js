const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({
    region : 'ap-south-1',
    accessKeyId : 'AKIA2OFMX4GA6UUHXINT',
    secretAccessKey : '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'
})

const dynamoDb = new AWS.DynamoDB();

router.post('/', async(req, res) => {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000); 
        const uniqueUserId = timestamp + random;
        const userName = req.body.UserName;
        const email = req.body.Email;
        const pass = req.body.Password;
        console.log(req.body);
        console.log(JSON.stringify({
            UserID : {S : uniqueUserId},
            UserName : {S : userName},
            Email : {S : email},
            Password : {S : pass}
        }));
        const chatBotConvo = {
            "L": [
              {
                "L": [
                  {
                    "M": {
                      "AllChat": {
                        "L": [
                        ]
                      },
                      "ConvoName": {
                        "S": "\"First Convo\""
                      }
                    }
                  }
                ]
              }
            ]
          }


        const params = {
            TableName : 'PersonalAIdatasets',
            Item : {
                UserID : {S : uniqueUserId},
                UserName : {S : userName},
                Email : {S : email},
                ChatBotConvo : chatBotConvo,
                Password : {S : pass}
            }
        }

        dynamoDb.putItem(params, (error, data) => {
            if(error){
                res.status(500).send(error);
            }else{
                res.status(201).send(
                    {
                        UserID : {S : uniqueUserId},
                        UserName : {S : userName},
                        ChatBotConvo : chatBotConvo,
                        Email : {S : email},
                        Password : {S : pass}
                    }
                )
            }
            
        })

})

module.exports = router;