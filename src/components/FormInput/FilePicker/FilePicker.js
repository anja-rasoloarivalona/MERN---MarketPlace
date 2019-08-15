import React from 'react';
import './FilePicker.css';
import { FormattedMessage} from 'react-intl';

import '../FormInput.css';

const filePicker = props => {
  return (
    <div className="input">
        <label htmlFor={props.id}>{props.label}</label>
        <div className="picker__input">
          <input
            required= 'true'
            type="file"
            id={props.id}
            onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
          />
          <button>
             <FormattedMessage id="browse" defaultMessage="Browse"/>
          </button>

          <span>
            {props.file ? props.file : <FormattedMessage id="noImageChosen" defaultMessage="No image chosen"/> }
          </span>
          
        </div>
      
      </div>
  )
  
};

export default filePicker;