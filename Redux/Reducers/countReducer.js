const initialState = {
    count : 0
}

const counterReducer = (state = initialState, action) => {
    if(action.type === "Increment"){
        console.log(state.count + 1);
        return {...state, count : state.count + 1};
    }
    if(action.type === "Decrement"){
        return {...state, count : state.count - 1};
    }

    return state;
}

export default counterReducer;