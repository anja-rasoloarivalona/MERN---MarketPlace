import React, {Fragment} from 'react';
import './DeskNav.css';
import { NavLink} from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';
import MobileToggler from '../MobileToggler/MobileToggler';


const deskNav = (props) => {
    return (
        <Fragment>
        <div className="deskNav__top">

        </div>
        <nav className="deskNav">           
            <NavLink to="/">
                <div className="deskNav__logo flex-centered-row">Market Place</div>
            </NavLink>
            <ul className="deskNav__list flex-centered-row">
                <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout}/>
            </ul>
            <MobileToggler onOpenMobileNav={props.onOpenMobileNav}/>
        </nav>
        </Fragment>
    )
}

export default deskNav;
