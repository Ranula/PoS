import {GET_ORDERS, ORDERS_LOADING, UPDATE_ORDER, ADD_ORDER} from '../actions/types'

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
        case UPDATE_ORDER:
            return{
                ...state,
                openOrders: action.payload,
            }
        case ADD_ORDER:
            return{
                ...state,
                openOrders: action.payload,
            }
        default:
            return state;
    }
}