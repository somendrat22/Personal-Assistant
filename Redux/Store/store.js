import {createStore, combineReducers} from 'redux';
import counterReducer from '../Reducers/countReducer';
import tokenReducer from '../Reducers/tokenReducer';
import meetStateReducer from '../Reducers/meetStateReducer';
import zoomChatReducer from '../Reducers/zoomChatReducer';


const rootReducer = combineReducers({
    counter : counterReducer,
    token : tokenReducer,
    meetState : meetStateReducer, 
    meetingChat : zoomChatReducer
})

const store = createStore(rootReducer);

export default store;