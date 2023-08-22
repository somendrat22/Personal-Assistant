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

router.post('/', async(req, res) => {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000); 
        const uniqueUserId = timestamp + random;
        const userName = req.body.UserName;
        const email = req.body.Email;
        const pass = req.body.Password;
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

                const user = {
                    UserID : {S : uniqueUserId},
                    UserName : {S : userName},
                    Email : {S : email},
                    ChatBotConvo : chatBotConvo,
                    Password : {S : pass}
                }

                user.exp = Math.floor(Date.now() / 1000) + 3600;
                const token = jwt.sign(user, secretKey);
                
                res.status(201).send(
                    {
                       "token" : token
                    }
                )
            }
            
        })

})

module.exports = router;