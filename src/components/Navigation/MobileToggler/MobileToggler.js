import React from 'react';

import './MobileToggler.css';

const mobileToggler = props => (
  <button className="mobileToggler" onClick={props.onOpenMobileNav}>
    <span className="mobileToggler__bar" />
    <span className="mobileToggler__bar" />
    <span className="mobileToggler__bar" />
  </button>
);

export default mobileToggler;
