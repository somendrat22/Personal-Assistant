const config = require('../../config');
const AWS = require('aws-sdk');

AWS.config.update({
    region : 'ap-south-1',
    accessKeyId : 'AKIA2OFMX4GA6UUHXINT',
    secretAccessKey : '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'
})


const dynamoDb = new AWS.DynamoDB();

const params = {
    TableName : "PersonalAIdatasets",
    KeyConditionExpression : 'UserID = :id',
    ExpressionAttributeValues : {
        ":id" : {"S" : "1"}
    }
}


dynamoDb.query(params, (err, data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data.Items[0].ChatBotConvo.L[0]);
    }
})
