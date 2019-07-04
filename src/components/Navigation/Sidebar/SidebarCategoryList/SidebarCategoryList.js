import React from 'react';
import './SidebarCategoryList.css';

import IconSvg from '../../../../util/svgHandler';

import Furniture from '../../../../assets/icon/SVG/furniture.svg';
import Clothes from '../../../../assets/icon/SVG/clothes.svg';
import Television from '../../../../assets/icon/SVG/television.svg';
import ReactSVG from 'react-svg';

const sidebarCategoryList = props => {

    const category = [
        "automobile", "laptop", "smartphone", "headphones",
    ]

    /*For some reason, the sprite is broken when using those svg, we'll try to fix this later*/

    const category2 = [
        {title: "Clothes", src: Clothes }, 
        {title: "Television", src: Television },  
        {title: "Furniture", src: Furniture }
    ]


    return  (
        <ul className={["sidebar__category__list",
                                "flex-centered-column",
                                props.hideCategoryFilter ? 'sidebar__category__list--hide' : ''].join(' ')}>
                   
                    { category.map( category => (
                        <li key={category} className="sidebar__category__list__item">
                            <IconSvg icon={category} size="big"/>
                            <span>{category}</span>
                        </li>
                    ))}

                    { category2.map( category => (
                        <li key={category.title} className="sidebar__category__list__item">
                            <ReactSVG src={category.src} className={`icon icon--${category.title}`}/>
                            <span>{category.title}</span>
                        </li>
                    ))}

                
                </ul>
    )
}
  


export default sidebarCategoryList
