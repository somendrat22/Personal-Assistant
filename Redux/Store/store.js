import {createStore, combineReducers} from 'redux';
import tokenReducer from '../Reducers/tokenReducer';
import meetStateReducer from '../Reducers/meetStateReducer';
import zoomChatReducer from '../Reducers/zoomChatReducer';



const rootReducer = combineReducers({
    token : tokenReducer,
    meetState : meetStateReducer, 
    meetChat : zoomChatReducer
})

const store = createStore(rootReducer);

export default store;