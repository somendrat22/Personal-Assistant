import {createStore, combineReducers} from 'redux';
import counterReducer from '../Reducers/countReducer';
import tokenReducer from '../Reducers/tokenReducer';
import meetStateReducer from '../Reducers/meetStateReducer';

const rootReducer = combineReducers({
    counter : counterReducer,
    token : tokenReducer,
    meetChat : meetStateReducer
})

const store = createStore(rootReducer);

export default store;