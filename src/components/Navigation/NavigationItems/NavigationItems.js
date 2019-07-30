import React, {Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItems.css';

const navListItems = [
    {id: 'admin-products', text: 'Admin', link:'/admin/products', auth: true},
    {id: 'login', text: 'Login', link:'/login', auth: false},
    {id: 'signup', text: 'Signup', link:'/signup', auth: false},
   
]

const navigationItems = props => [

   ( <Fragment>
            <li key="shop"
                className={["navigationItems", "centered", props.mobile ? "mobile" : ''].join(' ')}>    
                <NavLink to={'/'} exact onClick={props.onLoadShopIndex}>
                    Shop
                </NavLink>       
            </li> 
            <li key="cart"
                className={["navigationItems", "centered", props.mobile ? "mobile" : ''].join(' ')}>
                <NavLink to={'/cart'} onClick={props.onClickNavLink}>
                    Cart
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
                    {item.text}
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
