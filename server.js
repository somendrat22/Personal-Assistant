const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())

const port = 8081;
const getModelResponse = require('./routes/ModelConnect/getModelResponse');
const getChatBotAllChats = require('./routes/ChatBotDBConnect/getAllChats');
const doChat = require('./routes/Chats/doChat');
const accessToken = require("./routes/Meetings/accessToken");
app.use('/api/dochat', doChat);
app.use('/api/meeting/token', accessToken);
app.use('/api/modelconnect', getModelResponse);
app.use('/api/getallchats', getChatBotAllChats)
app.listen(port, () => {
    console.log("Server is up and running");
})

