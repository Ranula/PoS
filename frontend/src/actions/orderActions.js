import axios from 'axios'
import {GET_ORDERS, ORDERS_LOADING, UPDATE_ORDER, ADD_ORDER} from './types'
import authToken from '../utils/tokens'
// API Address
const HOST = "http://localhost:5500";

export const getOrders = (token) => dispatch => {
    authToken(token);
    // axios.defaults.headers.common['Authorization'] = token;
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
export const updateOrder = (order,token) => dispatch => {
    authToken(token);
    return axios.post(HOST+'/updateOrder',order)
    .then(res => {
        return dispatch( {
        type: UPDATE_ORDER,
        payload: res.data.docs
    });
})};

export const addOrder = (order,token) => dispatch => {
    authToken(token);
    return axios.post(HOST+'/addOrder',order)
    .then(res => {
        return dispatch( {
        type: ADD_ORDER,
        payload: res.data.docs
    });
    
})
}