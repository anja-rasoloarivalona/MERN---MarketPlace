import React, {Fragment} from 'react'
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';

const Shop = props => (
            <Fragment>      
                <div className='spacer_sidebar_mobile'></div>
                <Sidebar {...props}/>              
                {props.children}
            </Fragment>
        )
    



export default Shop;
