import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const button = props => !props.link ?
    (
        <button 
            className={['button', `button--${props.color}`].join(' ')}
            onClick={props.onClick}
            disabled={props.disabled || props.loading}
            type={props.type}>
                {props.loading ? 'Looading...' : props.children}
        </button>
    ) 
        :
    (
        <Link 
            className={['button', `button--${props.color}`].join(' ')}
            to={props.link}
            onClick={props.onClick}>
                {props.children}
        </Link>
    )

export default button;



/* COLOR AVAILABLE : PRIMARY - SECONDARY */
