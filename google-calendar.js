const {google} = require('googleapis');
require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const nodemailer = require("nodemailer");



// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Get date-time string for calender
const dateTimeForCalander = (dateTime) => {

    console.log(dateTime);

    let date = new Date(dateTime);

    let year = date.getFullYear();
    
    let month = date.getMonth() + 1;
   
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    // return {
    //     'start': startDate,
    //     'end': endDate
    // }

    return startDate;
};

// Insert new event to Google Calendar
const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });
    
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            console.log("Success");
            return 1;
        } else {
            console.log("Failure");
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

// let dateTime = dateTimeForCalander();

// Event for Google Calendar
// let event = {
//     'summary': `This is the summary.`,
//     'description': `This is the description.`,
//     'start': {
//         'dateTime': dateTime['start'],
//         'timeZone': 'Asia/Kolkata'
//     },
//     'end': {
//         'dateTime': dateTime['end'],
//         'timeZone': 'Asia/Kolkata'
//     }
// };

// insertEvent(event)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

router.post('/', async (req, res) => {
    const description = req.body.description;
    let summary = req.body.summary;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    const string = JSON.stringify(req.body);
    try{
        const queryText = `generate meeting notes for the meeting having description as per following json ${string} `;
        const genAiResp = await axios.get("http://localhost:8081/api/dochat", {
            params : {
                text : queryText
            }
        });

        

        summary = genAiResp.data[0].message.content;
        startTime = dateTimeForCalander(startTime);
        endTime = dateTimeForCalander(endTime);

        let event = {
            'summary': description,
            'location' : req.body.location,
            
            'description': summary,
            'start': {
                'dateTime': startTime,
                'timeZone': 'Asia/Kolkata'
            },
            'end': {
                'dateTime': endTime,
                'timeZone': 'Asia/Kolkata'
            }
        };

        console.log(event);
        // insertEvent(event)
        //     .then((res) => {
        //         res.status(201).send(res);
        //     })
        //     .catch((err) => {
        //         console.log("insertEvent error + ->  " + err)
        //         res.status(500).send(err);
        //     });

        const ans = await insertEvent(event);
        console.log(ans);

        const transporter = nodemailer.createTransport({
            service : "Gmail",
            auth : {
                user : 'somtechie22@gmail.com',
                pass : 'qixjhrzcqqcnvjfa'
            }
        })

        const sendEmail = async () => {
            try {
                const info = await transporter.sendMail({
                  from: "somtechie22@gmail.com",
                  to: req.body.attendees[0].email,
                  subject: req.body.summary,
                  text: summary,
                });
            
                console.log("Email sent:", info.response);
              } catch (error) {
                console.error("Error sending email:", error);
              }
        }
        sendEmail();
        res.status(200).send({ans})
    }catch(err){
        res.status(500).send(err);
    }



})

module.exports = router;