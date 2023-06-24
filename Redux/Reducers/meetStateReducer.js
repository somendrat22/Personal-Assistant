const initialState = {
    meetChat : false
}


const meetStateReducer = (state = initialState, action) => {
    if(action.type == 'UpdateChat'){
        console.log(action.payload)
        return {
            ...state, 
            meetChat : action.payload
        }
    }
    
    return state;
}

export default meetStateReducer;