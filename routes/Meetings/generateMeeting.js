const express = require('express');
const router = express.Router();
const Buffer = require('buffer').Buffer;
const axios = require('axios');
const moment = require("moment");

const convertTime = (timeStr) => {
  const timeObj = moment(timeStr, "YYYY-MM-DDTHH:mm:ss");
  return timeObj.format("HH:mm:ss");
};


router.get("/", async(req, res) => {
    

    const date = new Date(req.query.startTime);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

   const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
   console.log(req.params);
    try{
        const meetingdetails = {
                  "topic": req.query.summary,
                  "type": 2,
                  "start_time": formattedDateTime,
                  "duration": "45",
                  "timezone": "Europe/Madrid",
                  "agenda": req.query.description,
                  "recurrence": {"type": 1,
                                 "repeat_interval": 1
                                 },
                  "settings": {"host_video": "true",
                               "participant_video": "true",
                               "join_before_host": "False",
                               "mute_upon_entry": "False",
                               "watermark": "true",
                               "audio": "voip",
                               "auto_recording": "cloud"
                               }
                  }
        const token = req.headers.authorization;
        console.log(meetingdetails);
       const meetingRes = await axios.post("https://api.zoom.us/v2/users/me/meetings", meetingdetails, {
        headers : {
            "authorization" : `Bearer ${token}`,
            'content-type': 'application/json'
        }
       })
       
        res.status(200).send(meetingRes.data);
    }catch(err){
        res.status(500).send(err);
    }
})


module.exports = router;