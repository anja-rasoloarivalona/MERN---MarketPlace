import React, {Fragment} from 'react'
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';

const Shop = props => (
            <Fragment>
                
                <div className='spacer_sidebar_mobile'></div>

                <Sidebar 
                     maxPriceAllowed = {props.maxPriceAllowed} 
                     minPriceAllowed = {props.minPriceAllowed}
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
