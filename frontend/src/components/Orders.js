import React from "react";
import { connect } from "react-redux";
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
import { addOrder } from "../actions/orderActions";
import OrderModal from "./OrderModal";
import { withAlert } from "react-alert";
import { MdAddShoppingCart } from 'react-icons/md';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newOrders: []
    };
    this.addNewOrder = this.addNewOrder.bind(this);
    this.saveNewOrder = this.saveNewOrder.bind(this);
  }

  componentDidMount() {
    this.props.getOrders();
    this.props.getItems();
  }

  addNewOrder() {
    let newOrderId =
      this.props.order.openOrders.length + this.state.newOrders.length + 1;
    // return {newOrderId}
    let dummyOrders = this.state.newOrders;
    dummyOrders.push({newOrderId,'value':''});
    this.setState({
      newOrders: dummyOrders
    });
  }

  saveNewOrder(e) {
    let self = this;
    // eslint-disable-next-line array-callback-return
    this.state.newOrders.map((obj)=>{
        if(obj.newOrderId === e){
            if(this.validateInput(obj.value)){
                let objToSave = {
                    orderID: e,
                    customer: obj.value
                  };
                  self.props.addOrder(objToSave);
                  self.props.alert.success("Order Saved");
                  // eslint-disable-next-line eqeqeq
                  let newArray = this.state.newOrders.filter(obj => obj.newOrderId != e);
                  this.setState({
                      newOrders: newArray
                  })
            }
        }
    })
 
  }

  validateInput(name){
      if(/^[A-Za-z]+$/.test(name)){
          return true
      }else{
          this.props.alert.error("Please enter a valid name")
          return false
      }
  }

  onChangeInput(e){
      let test = this.state.newOrders;
      test = this.state.newOrders.map((obj) => {
          // eslint-disable-next-line eqeqeq
          if(obj.newOrderId == e.target.id){
            obj.value = e.target.value
            return obj
          }
          return obj
      })
      this.setState({
          newOrders: test
      })
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
              <Col xs="1" >
              <img
                height="70%"
                width="50%"
                src={require("../public/customer.png")}
                alt="customer"
              />
              </Col>
              <Col xs="3">
              
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

    const newOrdersArray = this.state.newOrders.map(({newOrderId}) => {
      return (
        <ListGroupItem key={newOrderId}>
          {" "}
          <Row>
            <Col xs="4">
              <h4>
                {" "}
                <Badge color="light"> # {newOrderId}</Badge>{" "}
              </h4>
            </Col>
            {/* <Col xs="4" /> */}
            <Col xs="4">
              <h4>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
                  <Input id={newOrderId} name="inputName" onChange={this.onChangeInput.bind(this)} />
                </InputGroup>
              </h4>
            </Col>
            {/* <Col xs="4" /> */}
            <Col xs="4">
              <Button
                className="float-right"
                id={newOrderId}
                color="warning"
                onClick={() => {
                  this.saveNewOrder(newOrderId);
                }}
            // onClick = {this.saveNewOrder}
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
          <MdAddShoppingCart></MdAddShoppingCart>New Order
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
  { getOrders, getItems, addOrder }
)(withAlert(Orders));
