import React from "react";
import {
  FlatList,
  ScrollView,
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import ChatBox from "./ChatBox"
import Meeting from "./Components/Meetings/Meeting";

const ChatTextInput = () => {
  const [enteredGoalText, setEnteredGoalText] = React.useState("");
  const [courseGoals, setCourseGoals] = React.useState([]);
  
  const goalInputHandler = (enteredGoalText) => {
    setEnteredGoalText(enteredGoalText);
  };

  const addGoalHandler = async() => {
    const apiResp = await axios.get("http://localhost:8081/api/dochat", {
      params : {
        text : enteredGoalText
      }
      
    })
    console.log(apiResp.data[0].message.content);
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
      { text : apiResp.data[0].message.content, id: Math.random().toString() },
    ]);
    setEnteredGoalText("");
  };

  return (
    
    <View style={{ flex: 1 }}>
      
      <View style = {styles.chatDisplay}>
        <FlatList 
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              
              <ChatBox data =  {itemData}></ChatBox>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.regenerateResponseButton}>
          <Icon name="refresh" size={20} color="#000" />
          <Text style={styles.text}>Regenerate Response</Text>
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={goalInputHandler}
            placeholder="Type your message.."
            value={enteredGoalText}
          />
          <Button title="Send message" onPress={addGoalHandler}></Button>

        </View>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 60,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center",
  },
  chatDisplay : {
    height : "90vh",
    display : "flex",
    justifyContent : "center",
    zIndex : "0",
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    alignSelf: "center",
    //zIndex: 1,
  },
  inputContainer: {
    height: "10vh",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    zIndex : "1000",
    // backgroundColor : "red"
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  text: {
    marginLeft: 10,
  },
  regenerateResponseButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: "center",
    marginVertical: 10,
    flexDirection: "row",
  },
});
export default ChatTextInput;
