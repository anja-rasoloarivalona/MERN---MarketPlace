import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItems.css';

const navListItems = [
    {id: 'shop', text: 'Shop', link:'/', auth: false},
    {id: 'admin', text: 'Admin', link:'/admin', auth: true},
    {id: 'admin-add-product', text: 'Add Product', link:'/admin/add-product', auth: false},
    {id: 'admin-add-product', text: 'Admin Products', link:'/admin/products', auth: false},
    {id: 'login', text: 'Login', link:'/login', auth: false},
    {id: 'signup', text: 'Signup', link:'/signup', auth: false},
    

]

const navigationItems = props => [
       
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
