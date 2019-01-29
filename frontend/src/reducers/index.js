import orderReducer from './orderReducer';
import itemReducer from './itemReducer';
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    order: orderReducer,
    item: itemReducer,
    auth: authReducer
});

export default rootReducer;