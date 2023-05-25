import { View, StyleSheet, Text} from "react-native"


const ChatBox = ({data}) =>{
    return (
        <View style = {style.chat_box_main}>
            <View>
                <Text>{data.item.text}</Text>
            </View>
        </View>
    )
}

const style =  StyleSheet.create({
       chat_box_main : {
        minHeight : "2vh",
        minWidth : "2vw",
        border : "1px solid black",
        backgroundColor : "015C4B",
        // display : "flex",
        // justifyContent : ""
       }
    });

export default ChatBox;