import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';


class Input extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: { min: 2, max: 10 },
    };
  }

 
  render() {
    return (
      <InputRange
        maxValue={20}
        minValue={0}
        value={this.state.value}
        onChange={value =>{
            this.setState({ value });
            console.log(value)
        }} />
    );
  }
}

export default Input;