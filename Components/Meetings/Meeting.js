import {View, Text, StyleSheet} from "react-native"
import { Stack, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from 'react';
import { AppBar } from "@react-native-material/core";


const Meeting = () => {

    const [state, updateState] = useState(false);
    const handlePress = () => {
        updateState(true);
    }

    return (
        <View style = {styles.container}>

            {
                !state ?  (
                <Stack fill center spacing={4}>
                   <FAB
                    variant="extended"
                    icon={props => <Icon name="navigation" {...props} />}
                    color="primary"
                    onPress={handlePress}
                    />
                </Stack>) : <>
                
                    <View styles = {styles.meetingBoxContainer}>
                        <View style>
                            <Text>Meeting Bot</Text>
                        </View>
                        <View>

                        </View>
                        <View>

                        </View>
                    </View>
                </>
            }

        </View>
    )
}



const styles = StyleSheet.create({
    container : {
        position : 'absolute',
        bottom : 70,
        right : 20,
        zIndex: 2,
        overflow : "hidden"
    }, 

    meetingBoxContainer : {
        position : 'absolute',
        bottom : 70, 
        right : 20,
        zIndex : 2,
        height : 60,
        width : 40
    }, 


})

export default Meeting;