import React from "react";
import "./SidebarCategoryToggler.css";
import IconSvg from "../../../../util/svgHandler";

const sidebarToggler = props => (
  <div className={["sidebar__category", props.hideCategoryFilter === false ? 'rotateIcon' : ''].join(' ')} onClick={props.hideCategoryFilterHandler}>
    <div className="flex-centered-row">
      <div className="sidebar__category__hamburger">
        <span />
        <span />
        <span />
      </div>
      <div>All Categories</div>
    </div>
    <IconSvg icon="down" />
  </div>
);

export default sidebarToggler;
