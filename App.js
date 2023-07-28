import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatTextInput from "./ChatTextInput";
import MenuBar from "./MenuBar";
import store from "./Redux/Store/store";
import { Provider, useSelector} from "react-redux";
import MeetingChat from "./Components/Meetings/MeetingChat";
import BackgroundChat from "./Components/BackgroundChat/BackGroundChat";

export default function App() {
  
  
  return (
    <Provider store = {store}>
      
      <View style={{ flex: 1, flexDirection: "row" }}>

        <MenuBar style={{ flex: 0.2}} />
        <BackgroundChat></BackgroundChat>
        
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
  },
});
