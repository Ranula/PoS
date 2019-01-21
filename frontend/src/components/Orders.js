import React from "react";
import { connect } from 'react-redux'
import * as orderActions from '../actions/orderActions'
import OrderList from './OrderList'
import {getOrders} from '../actions/orderActions'
import {getItems} from '../actions/itemActions'
import PropTypes from 'prop-types'
import {Container,ListGroup, ListGroupItem, Button} from 'reactstrap'

import OrderModal from './OrderModal'

class Orders extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getOrders();
        this.props.getItems();
    }

    render() {
        const openOrdersArray = this.props.order.openOrders.map(( {details_id, customer, items}) => {
            return   <ListGroupItem key={details_id}> {customer}<OrderModal orderId ={details_id} customer={customer} addedItems= {items} itemArray ={this.props.item}></OrderModal></ListGroupItem> 
        });
        
        return (
            <Container>
                <ListGroup>
                        {openOrdersArray}
                </ListGroup> 
            </Container>
        );
    }

}


Orders.prototypes ={
    getOrders: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
        order: state.order,
        item: state.item
});



export default connect(mapStateToProps, {getOrders,getItems})(Orders);