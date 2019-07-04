import React from 'react';
import './FormInput.css';

const formInput = props =>(
    <div className='input'>
        {           
            props.label && (<label htmlFor={props.id}>{props.label}</label>)
        }

        {
            props.control === 'input' && (
                <input className="input__field"
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
                <textarea className="textarea"
                    id={props.id}
                    required={props.required}
                    value={props.value}
                    onChange={e => props.onChange(props.id, e.target.value)}
                    />
            )
        }

        {
            props.control === 'select' && (
                <select id={props.id} 
                        required={props.required}
                        value={props.value}
                        onChange={e => props.onChange(props.id, e.target.value)}>  

                    <option value="automobile">automobile</option>
                    <option value="clothes">clothes</option>     
                    <option value="furniture">furniture</option>
                    <option value="headphones">headphones</option>
                    <option value="laptop">laptop</option>
                    <option value="smartphone">smartphone</option>
                    <option value="television">television</option>
                </select> 
            )
        }
    </div>
) 

export default formInput;
