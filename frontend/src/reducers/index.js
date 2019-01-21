import orderReducer from './orderReducer';
import itemReducer from './itemReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    order: orderReducer,
    item: itemReducer
});

export default rootReducer;