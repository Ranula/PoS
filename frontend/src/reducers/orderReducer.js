import {GET_ORDERS, ORDERS_LOADING} from '../actions/types'

const initialState = {
    openOrders: [],
    loading: false
}

export default  (state = initialState , action) => {
    switch(action.type){
        case GET_ORDERS:
            return {
                ...state,
                openOrders: action.payload,
                loading: false
            }
        case ORDERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}