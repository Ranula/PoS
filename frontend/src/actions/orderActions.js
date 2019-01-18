import axios from 'axios'
import {GET_ORDERS, ORDERS_LOADING} from './types'

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
