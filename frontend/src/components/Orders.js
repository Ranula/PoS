import React from "react";
import { connect } from 'react-redux'
import * as orderActions from '../actions/orderActions'
import OrderList from './OrderList'
import {getOrders} from '../actions/orderActions'
import PropTypes from 'prop-types'
import {Container,ListGroup, ListGroupItem, Button} from 'reactstrap'

import OrderModal from './OrderModal'

class Orders extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getOrders();
    }

    render() {
        const openOrdersArray = this.props.order.openOrders.map(( {details_id, customer}) => {
            return   <ListGroupItem key={details_id}> {customer}<OrderModal></OrderModal></ListGroupItem> 
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
    getItems: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
        order: state.order
});



export default connect(mapStateToProps, {getOrders})(Orders);