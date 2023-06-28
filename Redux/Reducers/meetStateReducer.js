const initialState = {
    meetState : 0
}

const meetStateReducer = (state = initialState, action) => {
    
    if(action.type =  'UpdateMeetState'){
        return {
            ...state, 
            meetState : state.meetState + 1
        }
    }

    return state;
}



export default meetStateReducer;