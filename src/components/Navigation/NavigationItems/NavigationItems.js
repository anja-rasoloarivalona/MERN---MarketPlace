import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItems.css';

const navListItems = [
    {id: 'shop', text: 'Shop', link:'/'},
 /*   {id: 'cart', text: 'Cart', link:'/cart', auth: true},*/
    {id: 'admin-products', text: 'Admin', link:'/admin/products', auth: true},
    {id: 'login', text: 'Login', link:'/auth/login', auth: false},
    {id: 'signup', text: 'Signup', link:'/auth/signup', auth: false},
   
    

]

const navigationItems = props => [

   (
        <li key={'shop'} 
                className={["navigationItems", "centered", props.mobile ? "mobile" : ''].join(' ')}
        >    
            <NavLink to={'/'} exact onClick={props.onClickNavLink}>
                Shop
            </NavLink>       
        </li> 
    ),   

     ...navListItems
        .filter(item => item.auth === props.isAuth)
        .map(item => (
            <li key={item.id} 
                className={["navigationItems", "centered", props.mobile ? "mobile" : ''].join(' ')}
            >    
                <NavLink to={item.link} exact onClick={props.onClickNavLink}>
                    {item.text}
                </NavLink>       
            </li>            
        )),
    
    props.isAuth && (
        <li className="navigationItems" key="logout">
            <button onClick={props.onLogout}>Logout</button>
        </li>
    )

];
export default navigationItems;
