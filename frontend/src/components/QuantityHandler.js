import React from 'react';
import NumericInput from 'react-numeric-input';

class QuantityHandler extends React.Component {
  state = {
    selectedQuantity: null,
  }

  componentDidMount(){
    // console.log();
    if (this.props.selectedQuantity){
      this.setState({
        selectedQuantity: this.props.selectedQuantity
      })
    }
  }

  // setOptionsList = (items) => {
  //     let options = items.map(( {item_id, item_name}) => {
  //     return {value:item_id, label:item_name}
  //   });
  //     return options
  // }
  
  handleChange = (selectedQuantity) => {
    this.setState({ selectedQuantity });
    console.log(`Option selected:`, selectedQuantity);
    this.props.quantityChange(selectedQuantity,this.props.rowID,this.props.type)
  }

  render() {
    const { selectedQuantity } = this.state;
    // const options = this.setOptionsList(this.props.items)

    return (
      <NumericInput style={{
        input: {
          maxWidth: '10ex',
          height: '3.5ex'
        }
      }} min={0} max={100} onChange={this.handleChange} value={selectedQuantity}/>
    );
  }
}

export default QuantityHandler;