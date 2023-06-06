import { View, Text} from "react-native"

const AllChats = ({data}) => {

    const bringChatData = () =>{

    }

    return (
        <View>
            <Text>{data.L[0].M.ConvoName.S}</Text>
           
            
        </View>
    );
}

export default AllChats;