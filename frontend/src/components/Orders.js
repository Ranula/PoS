import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as orderActions from '../actions/order'
import OrderList from './OrderList'

class Orders extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const orderDetails = this.props.order.map((item, idx) => {
                return <li key={idx}>{item}</li>
            });
        
        
        return (
            <div>
                <OrderList viewItem={this.props.action.viewOrder}></OrderList>
                <h2>Order Details</h2>
                <ul>
                    {orderDetails}
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        order: state.order
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(orderActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);