import axios from 'axios'
import {GET_ITEMS, ITEMS_LOADING} from './types'

// API Address
const HOST = "http://localhost:5500";

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get(HOST + '/getItems').then( res =>
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    ).catch(error => {
      console.log(error);
    });

};

export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}
