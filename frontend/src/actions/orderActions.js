import axios from 'axios'
import {GET_ORDERS, ORDERS_LOADING, UPDATE_ORDER, ADD_ORDER} from './types'

// API Address
const HOST = "http://localhost:5500";

export const getOrders = (token) => dispatch => {
    // var token = localStorage.getItem("token");
    console.log("Token",token)
    axios.defaults.headers.common['Authorization'] = token;
    dispatch(setOrdersLoading());
    return axios.get(HOST + '/openOrders').then( res => {
        return dispatch({
            type: GET_ORDERS,
            payload: res.data
        });
    })
};

export const setOrdersLoading = () => {
    return{
        type: ORDERS_LOADING
    }
}
export const updateOrder = (order) => dispatch => {
    axios.post(HOST+'/updateOrder',order)
    .then(res => {
        dispatch( {
        type: UPDATE_ORDER,
        payload: res.data.docs
    });
    
}).catch(error =>{
        console.log(error)
    })
}

export const addOrder = (order) => dispatch => {
    axios.post(HOST+'/addOrder',order)
    .then(res => {
        dispatch( {
        type: ADD_ORDER,
        payload: res.data.docs
    });
    
}).catch(error =>{
        console.log(error)
    })
}