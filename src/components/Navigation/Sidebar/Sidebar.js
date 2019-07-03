import React from 'react';
import './Sidebar.css';
import IconSvg from '../../../util/svgHandler';


const category = [
    "automobile", "laptop", "smartphone", "headphones"
]

const sidebar = props => (
    <section className="sidebar">

        <div className="sidebar__category">
            <div className="flex-centered-row">
                <div className="sidebar__category__hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div>
                    All Categoriees
                </div>
            </div>
            <IconSvg icon="down"/>
        </div>

        <ul className="sidebar__category__list flex-centered-column">
            { category.map( category => (
                <li key={category} className="sidebar__category__list__item">
                    <IconSvg icon={category} size="big"/>
                    {category}
                </li>
            ))}
        </ul>


    </section>
)

export default sidebar;
