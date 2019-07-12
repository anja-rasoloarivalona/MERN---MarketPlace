import React from 'react';
import IconSvg from '../../../util/svgHandler';

import NavigationItems from '../NavigationItems/NavigationItems';
import './MobileNav.css';

const mobileNavigation = props => (
  <nav className={['mobileNav', props.isMobileNavOpen ? 'open' : ''].join(' ')}>
    <header className="mobileNav__logo">Market Place</header>
    <ul
      className={['mobileNav__list', props.mobile ? 'mobile' : ''].join(' ')}
    >
      <NavigationItems
        mobile
        onClickNavLink={props.onClickNavLink}
        isAuth={props.isAuth}
        onLogout={props.onLogout}
      />
    </ul>
    <div className="mobileNav__social-media flex-centered-row">
        <IconSvg icon="facebook"/>
        <IconSvg icon="twitter"/>
        <IconSvg icon="instagram"/>
    </div>
  </nav>
);

export default mobileNavigation;