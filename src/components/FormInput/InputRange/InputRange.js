import React from 'react';
import './InputRange.css';
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
        maxValue={this.props.maxPriceAllowed}
        minValue={this.props.minPriceAllowed}
        value={this.props.priceRangeRequested}
        onChange = {this.props.onChangePriceRangeRequested}
        onChangeComplete = {this.props.onChangeCompletePriceRangeRequested}
        />
    );
  }
}

export default Input;