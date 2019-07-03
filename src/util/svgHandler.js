import React from 'react';
import './svgHandler.css';
import sprite from '../assets/icon/sprite.svg';

const iconSvg = props => {

    return (
        <svg viewBox='0 0 16 16' 
            className={`icon icon-${props.icon} ${props.size}`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">

            <use xlinkHref={`${sprite}#icon-${props.icon}`} />
        </svg>
    )   
} 
    


export default iconSvg;
