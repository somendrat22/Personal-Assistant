import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AllChats from "./AllChats/AllChats.js";

const MenuBar = () => {
  const [courseGoal, setCourseGoal] = React.useState([]);
  const [apiData, setApiData] = useState([]);
  useEffect(async() => {
    const x = await axios.get("http://localhost:8001/api/getallchats", {params:{uid:1}}); 
    console.log(x);
    setApiData(x.data);
  }, []);
  
  const saveCourseGoalsToDynamoDB = () => {
    setCourseGoal((currentCourseGoal) => [
      ...currentCourseGoal,
      { text: enteredGoal, id: Math.random().toString() },
    ]);
    setEnteredGoal("");
  };

  const data = [{convoName:"xyz", allConvo:[]}, {convoName:"tyz", allConvo:[]}, {convoName:"syz", allConvo:[]}, {convoName:"uyz", allConvo:[]}];

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity
          style={styles.button}
          onPress={saveCourseGoalsToDynamoDB}
        >
          <View style={styles.iconAndTextContainer}>
            <Icon name="plus" size={20} color="#000" />
            <Text style={styles.text}>New Chat</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.chatDisplay}>
          {
            apiData.length != 0 ? (<FlatList
              data={apiData}
              renderItem={(item) => {
                return <AllChats data = {item.item}></AllChats>;
              }}
              keyExtractor={(item, index) => {
                return item.id;
              }}
              alwaysBounceVertical={false}
            />) : <></>
          }
          
        </View>
      </View>

      <View style={styles.container2}>
        <TouchableOpacity style={styles.showMoreButton}>
          <Text style={styles.title}>Show More</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconAndTextContainer}>
            <Icon name="user" size={20} color="#000" />
            <Text style={styles.text}>Upgrade to Plus</Text>
            <TouchableOpacity style={styles.newButton}>
              <Text style={styles.title}>NEW</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>User Name</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
    height: "100%",
    width: "20%",
  },
  container1: {
    flex: 1,
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
  container2: {
    // alignSelf: "center",
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
  },
  showMoreButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: "center",
    marginVertical: 10,
  },
  newButton: {
    backgroundColor: "#ffdf00",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  iconAndTextContainer: {
    flexDirection: "row",
    //alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  chatDisplay : {
    height : "90vh",
    display : "flex",
    justifyContent : "center",
    zIndex : "0",
  },
});

export default MenuBar;
