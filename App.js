import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatTextInput from "./ChatTextInput";
import MenuBar from "./MenuBar";

export default function App() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <MenuBar style={{ flex: 0.2}} />
      <ChatTextInput style={{ flex: 0.8, alignItems: 'flex-end', alignSelf: 'flex-end' }} />
    </View>
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
