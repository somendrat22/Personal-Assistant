const initialState = {
    meetingChat :  []
}



const zoomChatReducer = (state = initialState, action) => {
    if(action.type == "UpdateChat"){
        return {
            ...state, meetingChat : action.payload
        }
    }

    return state;
}


export default zoomChatReducer;