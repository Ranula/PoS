import axios from 'axios'
import {GET_ITEMS, ITEMS_LOADING} from './types'
import authToken from '../utils/tokens'
// API Address
const HOST = "http://localhost:5500";

export const getItems = (token) => dispatch => {
    authToken(token);
    dispatch(setItemsLoading());
    return axios.get(HOST + '/getItems').then( res => {
        return dispatch({
            type: GET_ITEMS,
            payload: res.data
        });
    })
};

export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}
