import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import './MobileNav.css';

const mobileNavigation = props => (
  <nav className={['mobileNav', props.isMobileNavOpen ? 'open' : ''].join(' ')}>
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
  </nav>
);

export default mobileNavigation;