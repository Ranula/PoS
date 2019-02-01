import React from "react";
import {
  Row,
  Col,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap";
import { connect } from "react-redux";
import { updateOrder } from "../actions/orderActions";
import { PropTypes } from "prop-types";
import { withAlert } from "react-alert";
import lodash from "lodash";
import {
  MdAttachMoney
} from "react-icons/md";
import store from "../store";

class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.payOrder = this.payOrder.bind(this);
  }

  componentDidMount() {
    this.setState({
      customer: this.props.customer,
      itemsArray: this.props.itemArray.items,
      addedItems: this.props.addedItems,
      orderId: this.props.orderId,
      tableData: null,
      total: ""
    });
  }

  // Perrform on Modal open and auto close
  toggle() {
    var dataProcessed = this.processData(
      this.props.itemArray.items,
      this.props.addedItems
    );
    if (
      this.state.tableData === null ||
      lodash.isEqual(this.state.tableData, dataProcessed)
    ) {
      this.setState(
        {
          modal: !this.state.modal,
          tableData: dataProcessed
        },
        () => {
          this.setPrice();
        }
      );
    } else {
      this.setState(
        {
          modal: !this.state.modal
          // tableData: dataProcessed
        },
        () => {
          this.setPrice();
        }
      );
    }
  }

  // Save order status as closed and show an alert
  payOrder() {
    // Set auth Token
    var token = store.getState().auth.token;
    if (!token) {
      token = JSON.parse(localStorage.getItem("token")).payload.token;
    }

    let objToSave = {
      orderID: this.props.orderId,
      payload: this.state.tableData,
      pay: true
    };

    this.props
      .updateOrder(objToSave, token)
      .then(success => {
        this.props.alert.success("Payment Successfuly Saved");
      })
      .catch(error => {
        this.props.alert.error("Payment Failed. Try Signing in again");
      });
  }



  // Support function to map item ids to names
  processData(items, cart) {
    var finalArray = [];
    let counter = 1;

    if (items.length > 0 && cart.length > 0) {
      cart.forEach(pair => {
        let name = items[parseInt(pair[0]) - 1].item_name;
        let item_ID = parseInt(pair[0]);
        let unitPrice = items[parseInt(pair[0]) - 1].item_price;
        let quantity = parseInt(pair[1]);
        let price = unitPrice * quantity;
        let dataObject = {
          id: counter,
          item_id: item_ID,
          item_name: name,
          item_price: unitPrice,
          quantity: quantity,
          price: price
        };
        finalArray.push(dataObject);
        counter++;
      });
    }

    return finalArray;
  }

  // Calculate Total
  setPrice() {
    let total = 0;
    this.state.tableData.forEach(obj => {
      total = total + obj.price;
    });

    this.setState({
      total: total
    });
  }



  // Validate Data before Saving to DB
  validateRowTobeSaved(obj) {
    if (
      obj.id &&
      obj.item_name &&
      obj.price &&
      obj.item_price &&
      obj.quantity &&
      obj.item_id
    ) {
      return true;
    } else {
      this.props.alert.error("Fields are not Completed");
      return false;
    }
  }

  //Save locally in the state
  saveLocal(e) {
    let objToSave;
    let updatedTableData = this.state.tableData;
    this.state.newRowsData.forEach(obj => {
      if (
        obj.id === e &&
        this.validateRowTobeSaved(obj)
      ) {
        objToSave = obj;
      }
    });
    if (objToSave) {
      updatedTableData.push(objToSave);
      this.removeNew(e);
      this.setState(
        {
          tableData: updatedTableData
        },
        () => {
          this.setPrice();
          this.props.alert.success("Item Added to the Order");
        }
      );
    } else {
    }
  }

  render() {
    //Set initial rows from the database
    let rowsArray = [];
    if (this.state.tableData) {
      rowsArray = this.state.tableData.map(
        ({ id, item_name, item_price, quantity, price }) => {
          return (
            <tr key={id}>
              <td align="left">{item_name}</td>
              <td align="left">{item_price}</td>
              <td align="left"> {quantity}</td>
              <td align="left">{price}</td>
            </tr>
          );
        }
      );
    }

    const pStyle = {
      fontFamily: "sans-serif"
    };

    return (
      <div>
        {/* <h1>{this.props.items}</h1> */}
        <Button
          className="float-right"
          color="success"
          size="sm"
          onClick={this.toggle}
        >
          <b>
            <MdAttachMoney />Pay
          </b>
        </Button>
        <Modal
          size="xl"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <Row>
              <Col xs="1" />
              <Col xs="4">
                <h4>
                  {" "}
                  <Badge color="dark">
                    {" "}
                    Order Id: <Badge color="info">
                      {" "}
                      {this.state.orderId}
                    </Badge>{" "}
                  </Badge>{" "}
                </h4>
              </Col>
              <Col xs="2" />
              <Col xs="4">
                <h4>
                  {" "}
                  <Badge color="dark">
                    {" "}
                    Customer: <Badge color="info">
                      {" "}
                      {this.state.customer}
                    </Badge>{" "}
                  </Badge>{" "}
                </h4>
              </Col>
              <Col xs="1" />
            </Row>
          </ModalHeader>
          <ModalBody>
            <Table striped style={pStyle}>
              <thead>
                <tr>
                  <th align="center">
                    <h5>
                      <Badge color="secondary" pill>
                        {" "}
                        Item Name
                      </Badge>
                    </h5>
                  </th>
                  <th align="center">
                    <h5>
                      <Badge color="secondary" pill>
                        {" "}
                        Unit Price ($)
                      </Badge>
                    </h5>
                  </th>
                  <th align="center">
                    <h5>
                      <Badge color="secondary" pill>
                        {" "}
                        Quantity
                      </Badge>
                    </h5>
                  </th>
                  <th align="center">
                    <h5>
                      <Badge color="secondary" pill>
                        {" "}
                        Price ($){" "}
                      </Badge>
                    </h5>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rowsArray}
                <tr>
                  <th />
                  <th>
                    {" "}
                    <h4>Sub Total</h4>{" "}
                  </th>
                  <th>
                    <b>
                      <h4>{this.state.total} $</h4>
                    </b>
                  </th>
                  <th />
                </tr>

                {/* {newRowsArray} */}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            
            <Button color="success" onClick={this.payOrder}>
              <MdAttachMoney />
              Pay
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

OrderModal.prototypes = {
  getOrders: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  addedItems: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(
  mapStateToProps,
  { updateOrder }
)(withAlert(OrderModal));
