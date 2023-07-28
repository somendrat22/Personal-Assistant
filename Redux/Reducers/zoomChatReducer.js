const initialState = {
    meetChat : [{ user : "Assistant", text : "Hey, Welcome to the zoom meet generation chat", topic : 'Zoom/Topic'},
    {user : "Assistant", text : "What is the topic of your meeting ?", topic : 'Zoom/Topic'}] 
}

const zoomChatReducer = (state = initialState, action) => {
    
    if(action.type == 'UpdateZoomChat'){
        console.log(action);
        return {
            ...state, meetChat : action.payload
        }
    }
    return state;
}

export default zoomChatReducer