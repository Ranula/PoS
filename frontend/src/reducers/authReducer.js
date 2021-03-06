import {LOG_IN, IS_AUTHENTICATED, SIGN_UP} from '../actions/types'

const initialState = {
    token: null,
    loggedIn: false
}

export default  (state = initialState , action) => {
    switch(action.type){
        case LOG_IN:
            return {
                ...state,
                token: action.payload.token,
                loggedIn: true
            }
        case IS_AUTHENTICATED:
            return {
                ...state,
                loggedIn: action.payload
            }
        case SIGN_UP:
            return{
                ...state
            }
        default:
            return state;
    }
}