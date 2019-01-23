import React from 'react';
import Select from 'react-select';

class ItemsDropdown extends React.Component {
  state = {
    selectedOption: null,
  }

  componentDidMount(){
    console.log("props from item dropdown",this.props.selectedItem);
    if (this.props.selectedItem){
      this.setState({
        selectedOption: this.props.selectedItem
      })
    }

    console.log("selectedoptionisss",this.state.selectedOption)
  }

  setOptionsList = (items) => {
      let options = items.map(( {item_id, item_name}) => {
      return {value:item_id, label:item_name}
    });
      return options
  }
  
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    this.props.setItemPrice(selectedOption,this.props.rowID)
  }

  render() {
    const { selectedOption } = this.state;
    const options = this.setOptionsList(this.props.items)

    return (
      <Select 
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default ItemsDropdown;