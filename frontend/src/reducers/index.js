import orderReducer from './orderReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    order: orderReducer
});

export default rootReducer;