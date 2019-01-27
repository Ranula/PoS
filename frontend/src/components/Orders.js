import React from "react";
import { connect } from "react-redux";
import * as orderActions from "../actions/orderActions";
import OrderList from "./OrderList";
import { getOrders } from "../actions/orderActions";
import { getItems } from "../actions/itemActions";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Badge,
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroupAddon,
  Input,
  InputGroup
} from "reactstrap";

import OrderModal from "./OrderModal";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newOrders: []
    };
    this.addNewOrder = this.addNewOrder.bind(this);
  }

  componentDidMount() {
    this.props.getOrders();
    this.props.getItems();
  }

  addNewOrder() {
    console.log("add new order");
    let newOrderId =
      this.props.order.openOrders.length + this.state.newOrders.length + 1;
    // return {newOrderId}
    let dummyOrders = this.state.newOrders;
    dummyOrders.push(newOrderId);
    this.setState({
      newOrders: dummyOrders
    });
  }

  saveNewOrder(e) {
    console.log(e.target);
  }

  render() {
    const openOrdersArray = this.props.order.openOrders.map(
      ({ details_id, customer, items }, index) => {
        return (
          <ListGroupItem key={details_id}>
            {" "}
            <Row>
              <Col xs="4">
                <h4>
                  {" "}
                  <Badge color="light"> # {index + 1}</Badge>{" "}
                </h4>
              </Col>
              {/* <Col xs="4" /> */}
              <Col xs="4">
                <h4>
                  {" "}
                  <Badge color="light"> {customer}</Badge>{" "}
                </h4>
              </Col>
              {/* <Col xs="4" /> */}
              <Col xs="4">
                <OrderModal
                  orderId={details_id}
                  customer={customer}
                  addedItems={items}
                  itemArray={this.props.item}
                />
              </Col>
            </Row>
          </ListGroupItem>
        );
      }
    );

    const newOrdersArray = this.state.newOrders.map(id => {
      return (
        <ListGroupItem key={id}>
          {" "}
          <Row>
            <Col xs="4">
              <h4>
                {" "}
                <Badge color="light"> # {id}</Badge>{" "}
              </h4>
            </Col>
            {/* <Col xs="4" /> */}
            <Col xs="4">
              <h4>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
                  <Input name="inputName" />
                </InputGroup>
              </h4>
            </Col>
            {/* <Col xs="4" /> */}
            <Col xs="4">
              <Button
                className="float-right"
                id={id}
                color="warning"
                // onClick={() => {
                //   this.saveNewOrder(id);
                // }}
            onClick = {this.saveNewOrder}
              >
                {" "}
                save
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
      );
    });

    return (
      <Container>
        <ListGroup>
          {openOrdersArray}
          {newOrdersArray}
        </ListGroup>
        <br />
        <Button className="float-right" onClick={this.addNewOrder}>
          + New Order
        </Button>
      </Container>
    );
  }
}

Orders.prototypes = {
  getOrders: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order,
  item: state.item
});

export default connect(
  mapStateToProps,
  { getOrders, getItems }
)(Orders);
