const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())  
app.use(express.json());
const port = 8082;

const insertEvent = require("./google-calendar");

app.use("/calendar/insertevent", insertEvent);




app.listen(port, () =>{
    console.log("Calendar Service Running on port 8082");
})