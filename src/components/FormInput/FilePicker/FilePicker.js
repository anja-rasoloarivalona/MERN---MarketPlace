import React from 'react';

import '../FormInput.css';

const filePicker = props => (
  <div className="input">
    <label htmlFor={props.id}>{props.label}</label>
    <input
      type="file"
      id={props.id}
      onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
    />
  </div>
);

export default filePicker;