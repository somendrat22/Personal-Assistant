const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())

const port = 8001;
const getModelResponse = require('./routes/ModelConnect/getModelResponse');
const getChatBotAllChats = require('./routes/ChatBotDBConnect/getAllChats');
app.use('/api/modelconnect', getModelResponse);
app.use('/api/getallchats', getChatBotAllChats)
app.listen(port, () => {
    console.log("Server is up and running");
})

