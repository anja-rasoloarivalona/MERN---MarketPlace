import React, {Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItems.css';

import { FormattedMessage } from 'react-intl'

const navListItems = [
    {id: 'admin', text: 'Admin', link:'/admin', auth: true},
    {id: 'login', text: 'Login', link:'/login', auth: false},
    {id: 'signup', text: 'Signup', link:'/signup', auth: false},
   
]

const navigationItems = props => [

   ( <Fragment>
            <li key="shop"
                className={["navigationItems", "centered", props.mobile ? "mobile" : ''].join(' ')}>    
                <NavLink to={'/'} exact onClick={props.onLoadShopIndex}>           
                    <FormattedMessage id="shop.navigationItems" defaultMessage="Shop"/>
                </NavLink>       
            </li> 
            <li key="cart"
                className={["navigationItems", "centered", props.mobile ? "mobile" : ''].join(' ')}>
                <NavLink to={'/cart'} onClick={props.onClickNavLink}>
                    <FormattedMessage id="cart.navigationItems" defaultMessage="Cart"/>
                </NavLink>             
            </li> 
    </Fragment>
    ),   

        ...navListItems
        .filter(item => item.auth === props.isAuth)
        .map(item => {
            return (
                <li key={item.id} 
                className={["navigationItems", "centered", props.mobile ? "mobile" : ''].join(' ')}>    
                <NavLink to={item.link} exact onClick={props.onClickNavLink}>
                    <FormattedMessage id={`${item.id}.navigationItems`} defaultMessage={item.text}/>          
                </NavLink>       
            </li> 
            )
        }
                      
        ),
    
    props.isAuth && (
        <li className={["navigationItems", "centered", props.mobile ? "mobile" : ''].join(' ')} key="logout">
            <button onClick={props.onLogout}>Logout</button>
        </li>
    )
    

   

];
export default navigationItems;
