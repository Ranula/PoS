import axios from 'axios'
import {GET_ORDERS, ORDERS_LOADING, UPDATE_ORDER} from './types'

// API Address
const HOST = "http://localhost:5500";

export const getOrders = () => dispatch => {
    dispatch(setOrdersLoading());
    axios.get(HOST + '/openOrders').then( res =>
        dispatch({
            type: GET_ORDERS,
            payload: res.data
        })
    ).catch(error => {
      console.log(error);
    });

};

export const setOrdersLoading = () => {
    return{
        type: ORDERS_LOADING
    }
}
export const updateOrder = (order) => dispatch => {
    console.log("order from redux",order)

    axios.post(HOST+'/updateOrder',order)
    .then(res => {
        // console.log("NOTEDDDDDDDDDDD",res.data)
        dispatch( {
        type: UPDATE_ORDER,
        payload: res.data.docs
    });
    
}).catch(error =>{
        console.log(error)
    })
}
