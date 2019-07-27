import React, {Fragment} from 'react';
import './DeskNav.css';
import { NavLink} from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';
import MobileToggler from '../MobileToggler/MobileToggler';
import IconSvg from '../../../util/svgHandler';
import logo from '../../../assets/img/logo.png';



const deskNav = (props) => {
    return (
        <Fragment>
        <div className="deskNav__top">
            <div className="deskNav__top__language">
                English <IconSvg icon="down" size="small"/>
            </div>
            <div className="deskNav__top__icon flex-centered-row">
                <IconSvg icon='facebook' size='small'/>
                <IconSvg icon='twitter' size='small'/>
                <IconSvg icon='instagram' size='small'/>
            </div>
           
        </div>
        <nav className="deskNav">           
            <NavLink to="/">
                    <div className="deskNav__logo flex-centered-row">Market Place</div>
            </NavLink>
            <ul className="deskNav__list flex-centered-row">
                <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} onLoadShopIndex={props.onLoadShopIndex}
                   />
            </ul>
            <MobileToggler onOpenMobileNav={props.onOpenMobileNav}/>
        </nav>
        </Fragment>
    )
}

export default deskNav;



