import React from 'react';
import './NoProductFound.css';
import IconSvg from '../../util/svgHandler';

const noProductFound =  () => (
        <div className="products-not-found flex-centered-column">
            <IconSvg icon="sad"/> <span>No products match your selection</span>
        </div>
    )


export default noProductFound;
