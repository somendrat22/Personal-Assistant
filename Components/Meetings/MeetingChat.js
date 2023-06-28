import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { DatePickerModal } from 'react-native-paper-dates';
import axios from 'axios';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { connect } from 'react-redux';


const MeetingChat = () => {
  const [stage, updateStage] = useState(1);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showDateModal, setDateModal] = React.useState(false);
  const [showTimeModal, setTimeModal] = React.useState(false);
  const [hour, setHour] = React.useState(undefined);
  const [minute, setMinute] = React.useState(undefined);
  const [email, setEmail] = React.useState(undefined);
  const [zoomTopic, setZoomTopic] = React.useState("");
  

  useEffect(() => {
    setMessages([{ user : "Assistant", text : "Hey, Welcome to the zoom meet generation chat", topic : 'Zoom/Topic'},
    {user : "Assistant", text : "What is the topic of your meeting ?", topic : 'Zoom/Topic'}]);
  }, [])

  const handleTimeClick = () => {
    setTimeModal(true);
  }

  const [visible, setVisible] = useState(true)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setHour(hours);
      setMinute(minutes);
      setMessages([...messages, {user : "Assistant", text : "Enter invitee email", topic : "Emailnvite"}])
      updateStage(3);
    },
    [setVisible, setHour, setMinute, setMessages]
  );
 

  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(true);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      console.log(messages);
      const dateMssg = {
        user : "Assistant", 
        text : `Date for your meet is ${params.date}`,
        topic : "DisplayDate"
      }
      const mssgs = [...messages, dateMssg, {
        user : "Assistant", 
        text : "Pick yout time",
        topic : "Time"
      }];
      console.log(mssgs);
      setMessages(mssgs);
    },
    [setOpen, setDate, setMessages]
  );

  const handleDateClick = () => {
    setDateModal(true);
  }
  const handleSend = async () => {

    console.log(stage);
    if (newMessage.trim() !== '') {
      const mssg = {
        user : "user",
        text : newMessage
      }

      console.log(messages);

      if(stage == 1){
        const resp1 = {
          user : "Assistant", 
          text : `Topic for your zoom meeting is ${newMessage}`,
          topic : 'Zoom/Topic'
        }
        const resp2 = {
          user : "Assistant", 
          text : `Please provide date when you want to schedule your meeting.`,
          topic : 'Date'
        }
        const updatedMessage = [...messages, mssg, resp1, resp2];
        setZoomTopic(newMessage);
        setMessages(updatedMessage);
        updateStage(2);
        setNewMessage('');
      }else if(stage == 3){

        const userEmail = {
          user : "user", 
          text : newMessage
        }
        const emailMssg = {
          user : "Assistant",
          text : `Inviting ${newMessage} for meeting`, 
          topic : "EmailInvite"
        }
        const generateMeet = {
          user : "Assistant", 
          text : "Have some patience generating Meeting link and sending mails to invitiees",
          topic : "EmailInvite"
        }

        console.log("hii inside stage 3")
        setMessages([...messages, userEmail, emailMssg, generateMeet]);
        
        const token =  await axios.get("http://localhost:8081/api/meeting/token");

        const originalDate = new Date(date);
        originalDate.setHours(hour);
        originalDate.setMinutes(minute);
        const reqBody  = {
          startDate : originalDate,
          email : newMessage, 
          topic : zoomTopic
        }
        const headers = {
          token : token.data.access_token,
        }

        const meetingData = await axios.post("http://localhost:8081/api/meeting/generateMeeting", reqBody, {
          headers : headers
        })

        console.log(meetingData.data)

        setMessages([...messages, userEmail, emailMssg, generateMeet, {user : "Assistant", text : meetingData.data.start_url, topic : "ZoomLink"}]);
        
        
        setNewMessage('');
      }else{
        const resp = {
          user : "Assistant", 
          topic : "Reply",
          text : `We are validating your message`
        }

        const updatedMessage = [...messages, mssg, resp];
        setMessages(updatedMessage);
        setNewMessage('');
      }
    }
  }


  const handleLinkPress = (link) => {
    // Open the link using Linking module
    Linking.openURL(link);
  };


  const renderMessage = ({ item }) => (
    <View style={item.user == "Assistant" ? styles.otherMessageBubble : styles.userMessageBubble}>
      {
        item.user == "Assistant" && item.topic == 'Date' && ( 
        <>
          <Text style={styles.messageText}>{item.text}</Text>
          <TouchableOpacity style={styles.dateTimeButton} onPress={handleDateClick}>
            <Text style={styles.dateTimeButtonText}>Select Date</Text>
          </TouchableOpacity>
        </> 
        )
      }
      {
        item.user == "Assistant" && item.topic == 'Time' && ( 
          <>
            <Text style={styles.messageText}>{item.text}</Text>
            <TouchableOpacity style={styles.dateTimeButton} onPress={handleTimeClick}>
              <Text style={styles.dateTimeButtonText}>Pick Time</Text>
            </TouchableOpacity>
          </> 
        )
      }


    {
        item.user == "Assistant" && item.topic == 'Emailnvite' && ( 
          <>
            <Text style={styles.messageText}>{item.text}</Text>
          </> 
        )
      }

{
        item.user == "Assistant" && item.topic == 'EmailInvite' && ( 
          <>
            <Text style={styles.messageText}>{item.text}</Text>
          </> 
        )
      }

      {
        item.user == "Assistant" && item.topic == 'DisplayDate' && ( 
            <Text style={styles.messageText}>{item.text}</Text>
        )
      }

      {
        item.user == "Assistant" && item.topic == 'Reply' && ( 
            <Text style={styles.messageText}>{item.text}</Text>
        )
      }

      {
        item.user == "Assistant" && item.topic == 'Zoom/Topic' && (
          <Text style={styles.messageText}>{item.text}</Text>
        )
      }

      {
        item.user == "user" && (
          <Text style={styles.messageText}>{item.text}</Text>
        )
      }

{
        item.user == "Assistant" && item.topic == 'ZoomLink' && ( 
        <>
        <Text style={styles.dateTimeButtonText}>{item.text}</Text>
          
          {/* <TouchableOpacity style={styles.dateTimeButton} onPress={() => handleLinkPress(item.text)}>
            
          </TouchableOpacity> */}
        </> 
        )
      }


    </View>
  );


    return (
        <View  style = {styles.meetChatMainContainer}>
          <View style = {styles.meetChatContainer}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
                
            />

            {
              showDateModal && (
                <SafeAreaProvider>
                <DatePickerModal
                          locale="en"
                          mode="single"
                          visible={open}
                          onDismiss={onDismissSingle}
                          date={date}
                          onConfirm={onConfirmSingle}
                />
                </SafeAreaProvider>
              )
            }


            {
              showTimeModal && (
                <TimePickerModal
                  visible={visible}
                  onDismiss={onDismiss}
                  onConfirm={onConfirm}
                  hours={12}
                  minutes={14}
                />
              )
            }
            </View>
            <View style = {styles.chatInput}>
            <TextInput
                style={styles.input}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type your message..."
                placeholderTextColor="#999999"
                multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    meetChatMainContainer : {
        display : "flex",
        flexDirection : "column", 
        width : "80%",
        justifyContent : "center"
    }, 

     dateTimeButton: {
        backgroundColor: '#4CAF50',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 4,
        marginVertical: 16,
      },
      dateTimeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
      },
      selectedDateTimeContainer: {
        alignItems: 'center',
        marginBottom: 16,
      },
      selectedDateTimeText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    meetChatContainer : {
        height : "90%",
    },

    chatContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,
      },

      userMessageBubble: {
        backgroundColor: '#DCF8C6',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: '75%',
        alignSelf: 'flex-end',
      },
    
      otherMessageBubble: {
        backgroundColor: '#E5E5EA',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: '75%',
        alignSelf: 'flex-start',
      },
      messageBubble: {
        backgroundColor: '#DCF8C6',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        maxWidth: '75%',
        alignSelf: 'flex-start',
      },
      messageText: {
        fontSize: 16,
        color: '#000000',
      },
    

    chatInput: {
        display : "flex",
        justifyContent : "space-between",
        height : "10%",
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    input: {
        // height: 40,
        padding: 8,
        fontSize: 16,
        borderRadius: 4,
        backgroundColor: 'white',
        width : "60%"
    },
    sendButton: {
        marginLeft: 10,
        padding: 8,
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
    }


})

const mapStateToProps = state =>({
  token : state.token,
  meetState : state.meetState
})

const mapDispatchToProps = dispatch => ({
  tokenGenerate: (apiToken) => dispatch({ type: 'UPDATETOKEN', payload :  apiToken}),
  updateMeetState : () => dispatch({type : 'UpdateMeetState'})
})
  

export default connect(mapStateToProps, mapDispatchToProps)(MeetingChat);