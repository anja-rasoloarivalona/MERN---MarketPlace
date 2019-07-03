import React from 'react';

const iconSvg = props => 
    (
        <svg viewBox='0 0 16 16' className={`icon icon-${props.icon}`}>
            <use xlinkHref={`${props.url}#icon-${props.icon}`} />
        </svg>
    )


export default iconSvg;
