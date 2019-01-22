
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
  }

  componentDidMount() {
    this.setState({
      customer: this.props.customer,
      itemsArray: this.props.itemArray.items,
      addedItems: this.props.addedItems,
      orderId: this.props.orderId,
      tableData: "",
      total: "",
      newRows: []
    });
  }

  toggle() {
    var dataProcessed = this.processData(
      this.props.itemArray.items,
      this.props.addedItems
    );
    this.setPrice(dataProcessed);
    console.log("TOGGLE");
    this.setState({
      modal: !this.state.modal,
      tableData: dataProcessed
    });
  }

  removeNew(e) {
    let rowArray = this.state.newRows.filter(row => row.newRowId !== e);
    this.setState({
      newRows: rowArray
    });
  }

  addItem() {
    let newID = this.state.tableData.length + this.state.newRows.length + 1;
    var newRow = (
      <tr key={newID}>
        <td>
          <ItemsDropdown
            setItemPrice={this.setItemPrice.bind(this)}
            key={newID}
            rowID={newID}
            items={this.props.itemArray.items}
          />
        </td>
        <td>item_price</td>
        <td>quantity</td>
        <td>price</td>
        <td>
          <Button size="sm" color="info">
            Save
          </Button>
        </td>
        <td>
          <Button
            id={newID}
            onClick={() => {
              this.removeNew(newID);
            }}
            size="sm"
            color="danger"
          >
            X
          </Button>
        </td>
      </tr>
    );
    let newRowObj = {
      newRowId: newID,
      newRow: newRow
    };
    let rows = this.state.newRows;

    rows.push(newRowObj);
    this.setState({
      newRows: rows
    });
    // console.log(this.state.newRows)
  }

  processData(items, cart) {
    var finalArray = [];
    let counter = 1;
    cart.forEach(pair => {
      let name = items[parseInt(pair[0]) - 1].item_name;
      let unitPrice = items[parseInt(pair[0]) - 1].item_price;
      let quantity = parseInt(pair[1]);
      let price = unitPrice * quantity;
      let dataObject = {
        id: counter,
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

  setPrice(dataObject) {
    let total = 0;
    dataObject.forEach(obj => {
      total = total + obj.price;
    });
    this.setState({
      total: total
    });
  }

  setItemPrice(item, rowID) {
    let itemPrice;
    this.props.itemArray.items.map(({ item_id, item_price }) => {
      if (item_id === item.value) {
        itemPrice = item_price;
      }
    });

    let updatedRowsObj = this.state.newRows.map(rowObj => {
      if (rowObj.newRowId === rowID) {
        var newRow = (
          <tr key={rowID}>
            <td>
              <ItemsDropdown
                setItemPrice={this.setItemPrice.bind(this)}
                key={rowID}
                rowID={rowID}
                items={this.props.itemArray.items}
              />
            </td>
            <td>{itemPrice}</td>
            <td>quantity</td>
            <td>price</td>
            <td>
              <Button size="sm" color="info">
                Save
              </Button>
            </td>
            <td>
              <Button
                id={rowID}
                onClick={() => {
                  this.removeNew(rowID);
                }}
                size="sm"
                color="danger"
              >
                X
              </Button>
            </td>
          </tr>
        );


        let newReturn = {
          newRowId: rowID,
          newRow: newRow
        };
        return newReturn;
      } else {
        return rowObj;
      }
    });
    this.setState({
      newRows: updatedRowsObj
    });

  }

  render() {
    let rowsArray = [];
    if (this.state.tableData) {
      rowsArray = this.state.tableData.map(
        ({ id, item_name, item_price, quantity, price }) => {
          return (
            <tr key={id}>
              <td>{item_name}</td>
              <td>{item_price}</td>
              <td>
                <input type="number" value={quantity}></input>
              {/* <CounterInput value={quantity} min={1} max={50} onChange={ (value) => { console.log(value) } } /> */}
              
              </td>
              <td>{price}</td>
              <td>
                <Button size="sm" color="danger">
                  Remove
                </Button>
              </td>
            </tr>
          );
        }
      );
    }

    let newRowsArray = [];
    if (this.state.newRows) {
      this.state.newRows.map(a => {
        console.log(a);
        newRowsArray.push(a.newRow);
      });
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
