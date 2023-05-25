const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())

const port = 8001;
const getModelResponse = require('./routes/ModelConnect/getModelResponse');
app.use('/api/modelconnect', getModelResponse);

app.listen(port, () => {
    console.log("Server is up and running");
})

