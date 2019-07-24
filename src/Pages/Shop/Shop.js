import React, {Fragment} from 'react'
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';

const Shop = props => (
            <Fragment>
                
                <div className='spacer_sidebar_mobile'></div>

                <Sidebar 
                     maxPriceAllowed = {props.maxPriceAllowed} 
                     minPriceAllowed = {props.minPriceAllowed}

                     inputRangeValue = {props.inputRangeValue}

                     onInputRangeChange = {props.inputRangeChangeHandler}
                   //  minPrice = {props.productPriceRequested.min}
                 //    maxPrice = {props.productPriceRequested.max}                  
                     onChangeComplete = {props.onChangeComplete}

                    


                     sortbyhandler = {props.sortbyhandler}
                     sortBy = {props.sortBy}
 
               
                />
                
                {props.children}

            </Fragment>
        )
    



export default Shop;
