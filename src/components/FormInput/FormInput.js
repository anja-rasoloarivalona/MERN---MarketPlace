import React from 'react';
import './FormInput.css';

const formInput = props =>(
    <div className="input">
        {           
            props.label && (<label htmlFor={props.id}>{props.label}</label>)
        }

        {
            props.control === 'input' && (
                <input 
                    type={props.type} //text, email, password, number, etc...
                    id={props.id} //for the label
                    required={props.required}
                    value={props.value}
                    onChange={e => props.onChange(props.id, e.target.value /*, e.target.files*/)}
                />
            )
        }

        {
            props.control === 'textarea' && (
                <textarea 
                    id={props.id}
                    required={props.required}
                    value={props.value}
                    onChange={e => props.onChange(props.id, e.target.value)}
                    />
            )
        }
    </div>
) 

export default formInput;
