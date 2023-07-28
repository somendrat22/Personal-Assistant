import { View, StyleSheet, Text} from "react-native"


const ChatBox = ({data}) =>{
    console.log(data);
    return (
        <View style = {data.item.user == "Assistant" ? styles.otherMessageBubble : styles.userMessageBubble}>
            <View>
                <Text>{data.item.text}</Text>
            </View>
        </View>
    )
}

const styles =  StyleSheet.create({
       chat_box_main : {
        minHeight : "2vh",
        minWidth : "2vw",
        border : "1px solid black",
        backgroundColor : "015C4B",
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
    });

export default ChatBox;