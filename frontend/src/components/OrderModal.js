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
import ItemsDropdown from "./ItemsDropdown";
import QuantityHandler from "./QuantityHandler";
import { connect } from "react-redux";
import { updateOrder } from "../actions/orderActions";
import { PropTypes } from "prop-types";
import { withAlert } from "react-alert";
import lodash from "lodash";
import {
  MdDelete,
  MdSave,
  MdAddShoppingCart,
  MdShoppingCart
} from "react-icons/md";
import store from "../store";

class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeNew = this.removeNew.bind(this);
    this.setItemPrice = this.setItemPrice.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
    this.saveOrderandClose = this.saveOrderandClose.bind(this);
  }

  componentDidMount() {
    this.setState({
      customer: this.props.customer,
      itemsArray: this.props.itemArray.items,
      addedItems: this.props.addedItems,
      orderId: this.props.orderId,
      tableData: null,
      total: "",
      newRows: [],
      newRowsData: []
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
          this.saveOrder();
          this.setPrice();
        }
      );
    }
  }

  // Save order to the DB and show an alert
  saveOrder() {
    // Set auth Token
    var token = store.getState().auth.token;
    if (!token) {
      token = JSON.parse(localStorage.getItem("token")).payload.token;
    }

    let objToSave = {
      orderID: this.props.orderId,
      payload: this.state.tableData
    };

    this.props
      .updateOrder(objToSave, token)
      .then(success => {
        this.props.alert.success("Order Saved");
      })
      .catch(error => {
        this.props.alert.error("Saving Failed. Try Signing in again");
      });
  }

  // Save order and close the modal on "X" click
  saveOrderandClose() {
    this.setState(
      {
        modal: !this.state.modal
      },
      () => {
        var dataProcessed = this.processData(
          this.props.itemArray.items,
          this.props.addedItems
        );
        if (!lodash.isEqual(this.state.tableData, dataProcessed)) {
          this.saveOrder();
        }
      }
    );
  }

  // Remove a newly added row(item) before saving
  removeNew(e) {
    let rowArray = this.state.newRowsData.filter(row => row.id !== e);
    this.setState(
      {
        newRowsData: rowArray
      },
      () => {
        this.setPrice();
      }
    );
  }

  // Add a new item to the order
  addItem() {
    let newID = this.state.tableData.length + this.state.newRowsData.length + 1;
    let dataObject = {
      id: newID,
      item_name: null,
      item_id: null,
      item_price: null,
      quantity: null,
      price: null
    };
    let updatedDataArray = this.state.newRowsData;
    updatedDataArray.push(dataObject);

    this.setState({
      newRowsData: updatedDataArray
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

    this.state.newRowsData.forEach(obj => {
      total = total + obj.price;
    });
    this.setState({
      total: total
    });
  }

  // Set Item price based on the selected Item
  setItemPrice(item, rowID) {
    let itemPrice;
    let itemId;
    let itemName;
    // eslint-disable-next-line array-callback-return
    this.props.itemArray.items.map(({ item_id, item_price, item_name }) => {
      if (item_id === item.value) {
        itemPrice = item_price;
        itemId = item_id;
        itemName = item_name;
      }
    });
    let updatedRowsData = [];
    if (this.state.newRowsData) {
      updatedRowsData = this.state.newRowsData.map(rowObj => {
        if (rowObj.id === rowID) {
          rowObj.item_price = itemPrice;
          rowObj.item_id = itemId;
          rowObj.item_name = itemName;
          return rowObj;
        } else {
          return rowObj;
        }
      });
    }
    this.setState({
      newTableData: updatedRowsData
    });
  }

  // On change of the Quantity Handler
  quantityChange(quantity, rowID, type) {
    if (type === "saved") {
      let newTableData = [];
      if (this.state.tableData) {
        newTableData = this.state.tableData.map(rowObj => {
          if (rowObj.id === rowID) {
            let newPrice = quantity * rowObj.item_price;
            rowObj.price = newPrice;
            rowObj.quantity = quantity;
            return rowObj;
          } else {
            return rowObj;
          }
        });
      }
      this.setState(
        {
          tableData: newTableData
        },
        () => {
          this.setPrice();
        }
      );
    } else if (type === "new") {
      let newTableData = [];
      if (this.state.tableData) {
        newTableData = this.state.newRowsData.map(rowObj => {
          if (rowObj.id === rowID) {
            let newPrice = quantity * rowObj.item_price;
            rowObj.quantity = quantity;
            rowObj.price = newPrice;
            return rowObj;
          } else {
            return rowObj;
          }
        });
      }
      this.setState(
        {
          newRowsData: newTableData
        },
        () => {
          this.setPrice();
        }
      );
    }
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

  // Method to check whether item exists already
  checkExisting(obj) {
    let bool = true;
    this.state.tableData.forEach(dataObj => {
      if (dataObj.item_id === obj.item_id) {
        bool = false;
        this.removeNew(obj.id);
        this.props.alert.error("Item exists. Change the quantity");
      }
    });
    return bool;
  }

  //Save locally in the state
  saveLocal(e) {
    let objToSave;
    let updatedTableData = this.state.tableData;
    this.state.newRowsData.forEach(obj => {
      if (
        obj.id === e &&
        this.validateRowTobeSaved(obj) &&
        this.checkExisting(obj)
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

  //Remove from the state to change through Save function
  removeGlobal(e) {
    let rowArray = this.state.tableData.filter(row => row.id !== e);
    this.setState(
      {
        tableData: rowArray
      },
      () => {
        this.setPrice();
      }
    );
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
              <td>
                <QuantityHandler
                  rowID={id}
                  type="saved"
                  quantityChange={this.quantityChange.bind(this)}
                  selectedQuantity={quantity}
                />
              </td>
              <td align="left">{price}</td>
              <td>
                <Button
                  size="md"
                  color="danger"
                  onClick={() => {
                    this.removeGlobal(id);
                  }}
                >
                  <MdDelete />
                </Button>
              </td>
            </tr>
          );
        }
      );
    }

    //Handle newly added rows
    let newRowsArray = [];
    if (this.state.newRowsData) {
      newRowsArray = this.state.newRowsData.map(
        ({ id, item_name, item_id, item_price, quantity, price }) => {
          return (
            <tr key={id}>
              <td>
                <ItemsDropdown
                  setItemPrice={this.setItemPrice.bind(this)}
                  key={id}
                  rowID={id}
                  items={this.props.itemArray.items}
                  selectedItem={{ value: item_id, label: item_name }}
                />
              </td>
              <td align="center">{item_price ? item_price : "item_price"}</td>
              <td align="center">
                {item_name ? (
                  <QuantityHandler
                    rowID={id}
                    type="new"
                    quantityChange={this.quantityChange.bind(this)}
                    selectedQuantity={quantity}
                  />
                ) : (
                  "quantity"
                )}
              </td>
              <td align="center">{price ? price : "price"}</td>
              <td>
                <Button
                  size="md"
                  onClick={() => {
                    this.saveLocal(id);
                  }}
                  color="warning"
                >
                  <MdSave />
                </Button>
                <Button
                  id={id}
                  onClick={() => {
                    this.removeNew(id);
                  }}
                  size="md"
                  color="danger"
                >
                  <MdDelete />
                </Button>
              </td>
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
          color="info"
          size="sm"
          onClick={this.toggle}
        >
          <b>
            <MdShoppingCart />View
          </b>
        </Button>
        <Modal
          size="xl"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.saveOrderandClose}>
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
                {newRowsArray}
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
                  <th />
                </tr>

                {/* {newRowsArray} */}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.addItem}>
              <MdAddShoppingCart />
              Add Item
            </Button>{" "}
            <Button color="warning" onClick={this.saveOrder}>
              <MdSave />
              Save
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
