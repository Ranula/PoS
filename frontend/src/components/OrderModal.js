// import React, { Component } from 'react';
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   FormGroup,
//   Label,
//   Input
// } from 'reactstrap';
// import { connect } from 'react-redux';
// // import { addItem } from '../actions/itemActions';

// class OrderModal extends Component {
//   state = {
//     modal: false,
//     name: ''
//   };

//   toggle = () => {
//     this.setState({
//       modal: !this.state.modal
//     });
//   };

//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   onSubmit = e => {
//     e.preventDefault();

//     const newItem = {
//       name: this.state.name
//     };

//     // Add item via addItem action
//     this.props.addItem(newItem);

//     // Close modal
//     this.toggle();
//   };

//   render() {
//     return (
//       <div>
//         <Button
//           color="dark"
//           style={{ marginBottom: '2rem' }}
//           onClick={this.toggle}
//         >
//           Add Item
//         </Button>

//         <Modal isOpen={this.state.modal} toggle={this.toggle}>
//           <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
//           <ModalBody>
//             <Form onSubmit={this.onSubmit}>
//               <FormGroup>
//                 <Label for="item">Item</Label>
//                 <Input
//                   type="text"
//                   name="name"
//                   id="item"
//                   placeholder="Add shopping item"
//                   onChange={this.onChange}
//                 />
//                 <Button color="dark" style={{ marginTop: '2rem' }} block>
//                   Add Item
//                 </Button>
//               </FormGroup>
//             </Form>
//           </ModalBody>
//         </Modal>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   item: state.item
// });

// export default connect(
//   mapStateToProps,
//   {  }
// )(OrderModal);

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import QuantityDropdown from './QuantityDropdown';
import { runInThisContext } from 'vm';

class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){

    this.setState ({
      customer:this.props.customer,
      itemsArray: this.props.itemArray.items,
      addedItems: this.props.addedItems,
      orderId: this.props.orderId,
      tableData: '',
      total:''
    });
  }

  toggle() {
    var dataProcessed = this.processData( this.props.itemArray.items, this.props.addedItems)
    this.setPrice(dataProcessed)
    // console.log(this.state)
    this.setState({
      modal: !this.state.modal,
      tableData:dataProcessed
    });
  }

  processData(items,cart){
    var finalArray = [];
    let counter = 1
    cart.forEach( (pair) => {
      let name = items[parseInt(pair[0])-1].item_name;
      let unitPrice = items[parseInt(pair[0])-1].item_price;
      let quantity = parseInt(pair[1]);
      let price = unitPrice* quantity
      let dataObject = {
        id:counter,
        item_name: name,
        item_price: unitPrice,
        quantity:quantity,
        price:price
      }
      // console.log(dataObject);
      finalArray.push(dataObject)
      counter ++;
    });
    return finalArray
  }

  setPrice(dataObject){
    let total = 0;
    dataObject.forEach((obj)=>{
      total = total + obj.price
    })
    this.setState({
      total : total
    })
  }

  render() {
    let rowsArray = []
    if (this.state.tableData){
        rowsArray = this.state.tableData.map(( {id, item_name, item_price, quantity, price}) => {
        return <tr key={id}><th scope="row">{id}</th><td>{item_name}</td><td>{item_price}</td><td>{quantity}</td><td>{price}</td><td><Button size="sm" color="danger">Remove</Button></td></tr>
      });
    }
  
    return (
      <div>
        {/* <h1>{this.props.items}</h1> */}
        <Button className="float-right" color="info" onClick={this.toggle}>View</Button>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          
          <b>Customer: {this.state.customer} <br></br> OrderID: {this.state.orderId}</b>
          
          </ModalHeader>
          <ModalBody>
            

          <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Unit Price ($)</th>
            <th>Quantity</th>
            <th>Price ($)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rowsArray}
          <tr><th></th><th></th><th> Sub Total </th><th><b>{this.state.total} $</b></th></tr>
        </tbody>
      </Table>



          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default OrderModal;