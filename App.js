import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatTextInput from "./ChatTextInput";
import MenuBar from "./MenuBar";
import store from "./Redux/Store/store";
import { Provider } from "react-redux";
import Meeting from "./Components/Meetings/Meeting";
import MeetingChat from "./Components/Meetings/MeetingChat";

export default function App() {
  return (
    <Provider store = {store}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MenuBar style={{ flex: 0.2}} />
        <ChatTextInput style={{ flex: 0.8, alignItems: 'flex-end', alignSelf: 'flex-end' }} />
        <MeetingChat style={{ flex: 0.8, alignItems: 'flex-end', alignSelf: 'flex-end' }}></MeetingChat>
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
