import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const initialState = {};

const middleware = [thunk,logger];

const store = createStore(rootReducer, 
    initialState, 
    compose(composeWithDevTools(applyMiddleware(...middleware))
)
);

export default store;



// (applyMiddleware(logger, thunk, promise()))