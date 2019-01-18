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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="info" onClick={this.toggle}>View</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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