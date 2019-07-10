import React, {Fragment} from 'react'
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';

const Shop = props => (
            <Fragment>
        
                <Sidebar 
                     maxPriceRequested = {props.priceMax} 
                     minPriceRequested = {props.priceMin}
                     inputRangeValue = {props.productPriceRequested}
                     onInputRangeChange = {props.inputRangeChangeHandler}
                     minPrice = {props.productPriceRequested.min}
                     maxPrice = {props.productPriceRequested.max}
               
                />
                
                {props.children}

            </Fragment>
        )
    



export default Shop;
