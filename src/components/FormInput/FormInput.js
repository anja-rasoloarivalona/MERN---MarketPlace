import React from 'react';
import './FormInput.css';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';


const messages = defineMessages({
    automobile: {
        id: "automobile.sidebar",
        defaultMessage: "Automobile"
    },
    laptop: {
        id: "laptop.sidebar",
        defaultMessage: "Laptop"
    },
    smartphone: {
        id: "smartphone.sidebar",
        defaultMessage: 'Smartphone'
    },
    headphones: {
        id: "headphones.sidebar",
        defaultMessage: "Headphones"
    },
    clothes: {
        id: "clothes.sidebar",
        defaultMessage: "Clothes"
    },
    television: {
        id: "television.sidebar",
        defaultMessage: "Television"
    },
    furniture: {
        id: "furniture.sidebar",
        defaultMessage: "Furniture"
    }
})


const formInput = props =>{
    const {formatMessage} = props.intl;

    return (
        <div className='input'>
                {           
                    props.label && (<label htmlFor={props.id}>{props.label}</label>)
                }

                {
                    props.control === 'input' && (

                    <input className="input__field"
                //   <input className= {["input__field", props.checkout ? 'border' : '']}
                            type={props.type} //text, email, password, number, etc...
                            id={props.id} //for the label
                            required={props.required}
                            value={props.value}
                            placeholder = {props.placeholder}
                            onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
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

                            <option value="automobile">{formatMessage(messages.automobile)}</option>
                            <option value="clothes">{formatMessage(messages.clothes)}</option>     
                            <option value="furniture">{formatMessage(messages.furniture)}</option>
                            <option value="headphones">{formatMessage(messages.headphones)}</option>
                            <option value="laptop">{formatMessage(messages.laptop)}</option>
                            <option value="smartphone">{formatMessage(messages.smartphone)}</option>
                            <option value="television">{formatMessage(messages.television)}</option>
                        </select> 
                    )
                }
            </div>
    )
    
}

export default injectIntl(formInput);
