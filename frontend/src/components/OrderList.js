import React from "react";

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openOrders: [
                "order 1",
                "order 2",
                "order 3"
            ]
        };
        this.onClickView = this.onClickView.bind(this);
    }


    onClickView(item) {
        this.props.viewItem(item)
    }


    render() {
        const orderArray = this.state.openOrders.map(( item, idx) => {
            return <li key={idx}>{item} <button onClick={()=>this.onClickView(item)}>View</button> </li>
        });

        return (
            <div>
                <h2>Order List</h2>
                <ul>
                    {orderArray}
                </ul>
            </div>
        );
    }

}
export default OrderList;