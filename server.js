const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())  
app.use(express.json());
const port = 8081;
const login = require('./routes/Login/Login');
const postUserData = require('./routes/SignUp/postUserDetails');
const getModelResponse = require('./routes/ModelConnect/getModelResponse');
const getChatBotAllChats = require('./routes/ChatBotDBConnect/getAllChats');
const doChat = require('./routes/Chats/doChat');
const accessToken = require("./routes/Meetings/accessToken");
const generateMeeting = require("./routes/Meetings/generateMeeting");
app.use('/api/login', login);
app.use('/api/dochat', doChat);
app.use('/api/meeting/token', accessToken);
app.use('/api/modelconnect', getModelResponse);
app.use('/api/getallchats', getChatBotAllChats);
app.use('/api/register', postUserData);
app.use('/api/meeting/createmeeting', generateMeeting);
app.listen(port, () => {
    console.log("Server is up and running");
})

