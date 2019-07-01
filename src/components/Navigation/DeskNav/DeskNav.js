import React from 'react';
import './DeskNav.css';
import { NavLink} from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';
import MobileToggler from '../MobileToggler/MobileToggler';


const deskNav = (props) => {
    return (
        <nav className="deskNav">           
            <NavLink to="/">
                <h1>Market Place</h1>
            </NavLink>
            <ul className="deskNav__list flex-centered-row">
                <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout}/>
            </ul>
            <MobileToggler onOpenMobileNav={props.onOpenMobileNav}/>
        </nav>
    )
}

export default deskNav;
