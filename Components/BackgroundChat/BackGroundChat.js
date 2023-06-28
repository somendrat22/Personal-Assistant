import {connect} from 'react-redux';
import MeetingChat from "../Meetings/MeetingChat";
import ChatTextInput from "../../ChatTextInput";


const BackgroundChat = ({meetState}) => {
    return (
        <>
        {
            ((meetState.meetState%2 == 0 )?
            <ChatTextInput style={{ flex: 0.8, alignItems: 'flex-end', alignSelf: 'flex-end' }} /> : 
            <MeetingChat style={{ flex: 0.8, alignItems: 'flex-end', alignSelf: 'flex-end' }}></MeetingChat>)
        }
        </>

        
    )
}

const mapStateToProps = state =>({
    meetState : state.meetState
  })


export default connect(mapStateToProps)(BackgroundChat);