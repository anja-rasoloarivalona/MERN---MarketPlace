import React, {Fragment} from 'react';
import './DeskNav.css';
import { NavLink} from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';
import MobileToggler from '../MobileToggler/MobileToggler';
import IconSvg from '../../../util/svgHandler';
import logo from '../../../assets/img/logo.png';
import {connect } from 'react-redux';
import * as actions from '../../../store/actions/index';



const deskNav = (props) => {
    return (
        <Fragment>
        <div className="deskNav__top">
            <div className="deskNav__top__language">
                <select  onChange={e => props.changeLanguage(e.target.value)}
                        value={props.lang}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                </select>
                <IconSvg icon="down" size="small"/>
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
                <NavigationItems 
                        isAuth={props.isAuth} 
                        onLogout={props.onLogout} 
                        onLoadShopIndex={props.onLoadShopIndex}
                   />
            </ul>
            <MobileToggler onOpenMobileNav={props.onOpenMobileNav}/>
        </nav>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        lang: state.auth.lang
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: lang => dispatch(actions.changeLanguage(lang))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( deskNav);



