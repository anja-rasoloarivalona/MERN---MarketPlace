import React, {Fragment} from 'react'
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';

const Shop = props => (
            <Fragment>
                
                <div className='spacer_sidebar_mobile'></div>

                <Sidebar 
                     maxPriceRequested = {props.priceMax} 
                     minPriceRequested = {props.priceMin}
                     inputRangeValue = {props.productPriceRequested}
                     onInputRangeChange = {props.inputRangeChangeHandler}
                     onChangeComplete = {props.onChangeComplete}
                     minPrice = {props.productPriceRequested.min}
                     maxPrice = {props.productPriceRequested.max}
                     sortbyhandler = {props.sortbyhandler}
                     sortBy = {props.sortBy}
                 /*    onChangeComplete ={props.onChangeComplete}*/
               
                />
                
                {props.children}

            </Fragment>
        )
    



export default Shop;
