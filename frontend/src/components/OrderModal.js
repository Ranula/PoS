import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap";
import ItemsDropdown from "./ItemsDropdown";
import QuantityHandler from "./QuantityHandler";

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
  }

  componentDidMount() {
    this.setState({
      customer: this.props.customer,
      itemsArray: this.props.itemArray.items,
      addedItems: this.props.addedItems,
      orderId: this.props.orderId,
      tableData: [],
      total: "",
      newRows: [],
      newRowsData: []
    });
  }

  toggle() {
    var dataProcessed = this.processData(
      this.props.itemArray.items,
      this.props.addedItems
    );
    console.log("TOGGLE");
    this.setState(
      {
        modal: !this.state.modal,
        tableData: dataProcessed
      },
      () => {
        this.setPrice();
      }
    );
  }

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

  processData(items, cart) {
    var finalArray = [];
    let counter = 1;
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
      // console.log(dataObject);
      finalArray.push(dataObject);
      counter++;
    });
    return finalArray;
  }

  setPrice() {
    let total = 0;
    console.log(
      "setPrice called",
      this.state.tableData,
      this.state.newRowsData
    );
    this.state.tableData.forEach(obj => {
      console.log(obj);
      total = total + obj.price;
    });

    this.state.newRowsData.forEach(obj => {
      total = total + obj.price;
    });
    this.setState({
      total: total
    });
  }

  setItemPrice(item, rowID) {
    let itemPrice;
    let itemId;
    let itemName;
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
          // let newPrice = quantity * rowObj.item_price;
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

  validateRowTobeSaved(obj){
    if( obj.id && obj.item_name && obj.price && obj.item_price && obj.quantity && obj.item_id){
      return true
    }else{
      return false
    }
  }
  saveLocal(e){
    let objToSave;
    let updatedTableData = this.state.tableData;
    this.state.newRowsData.forEach(obj => {
      if(obj.id === e && this.validateRowTobeSaved(obj) ){
        objToSave = obj
      }
    });
    if(objToSave){
      updatedTableData.push(objToSave)
      this.removeNew(e);
      this.setState({
        tableData: updatedTableData
      }, () =>{
        this.setPrice()
      })
    }else{
      console.log("Adding Failed")
    }
  }

  removeGlobal(e){
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
              <td>{item_name}</td>
              <td>{item_price}</td>
              <td>
                <QuantityHandler
                  rowID={id}
                  type="saved"
                  quantityChange={this.quantityChange.bind(this)}
                  selectedQuantity={quantity}
                />
              </td>
              <td>{price}</td>
              <td>
                <Button size="sm" color="danger" onClick={() => {
                    this.removeGlobal(id);
                  }}>
                  Remove
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
          console.log("Render eke", {
            id,
            item_name,
            item_id,
            item_price,
            quantity,
            price
          });
          return (
            <tr key={id}>
              <td>
                {" "}
                <ItemsDropdown
                  setItemPrice={this.setItemPrice.bind(this)}
                  key={id}
                  rowID={id}
                  items={this.props.itemArray.items}
                  selectedItem={{ value: item_id, label: item_name }}
                />
              </td>
              <td>{item_price ? item_price : "item_price"}</td>
              <td>
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
              <td>{price ? price : "price"}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => {
                    this.saveLocal(id);
                  }}
                  color="info"
                >
                  Save
                </Button>
              </td>
              <td>
                <Button
                  id={id}
                  onClick={() => {
                    this.removeNew(id);
                  }}
                  size="sm"
                  color="danger"
                >
                  X
                </Button>
              </td>
            </tr>
          );
        }
      );
    }

    return (
      <div>
        {/* <h1>{this.props.items}</h1> */}
        <Button className="float-right" color="info" onClick={this.toggle}>
          View
        </Button>
        <Modal
          size="lg"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <b>
              Customer: {this.state.customer} <br /> OrderID:{" "}
              {this.state.orderId}
            </b>
          </ModalHeader>
          <ModalBody>
            <Table striped>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Unit Price ($)</th>
                  <th>Quantity</th>
                  <th>Price ($)</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rowsArray}
                {newRowsArray}
                <tr>
                  <th />
                  <th> Sub Total </th>
                  <th>
                    <b>{this.state.total} $</b>
                  </th>
                </tr>
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addItem}>
              Add Item
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default OrderModal;
