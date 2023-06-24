const initialState = {
    token : null
}


const tokenReducer = (state = initialState, action) =>{
    if(action.type == 'UPDATETOKEN'){
        console.log(action.payload);
        return {...state, token : action.token}
    }
    return state;
}

export default tokenReducer;

