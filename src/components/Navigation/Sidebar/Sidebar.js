import React, { Component } from 'react'
import './Sidebar.css';
import IconSvg from '../../../util/svgHandler';




class Sidebar extends Component {
    state = {
        hideCategoryFilter : false,
    }

    hideCategoryFilterHandler = ()=> {
        console.log('clicked')
        this.setState(prevstate => ({
            hideCategoryFilter: !prevstate.hideCategoryFilter
        }))
    }

    render() {
        const category = [
            "automobile", "laptop", "smartphone", "headphones"
        ]

        return (
            <section className="sidebar">

                <div className="sidebar__category" 
                     onClick={this.hideCategoryFilterHandler}>
                    <div className="flex-centered-row">
                        <div className="sidebar__category__hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div>
                            All Categories
                        </div>
                    </div>
                    <IconSvg icon="down"/>
                </div>

                <ul className={["sidebar__category__list",
                                "flex-centered-column",
                                this.state.hideCategoryFilter ? 'sidebar__category__list--hide' : ''].join(' ')}>
                    { category.map( category => (
                        <li key={category} className="sidebar__category__list__item">
                            <IconSvg icon={category} size="big"/>
                            {category}
                        </li>
                    ))}
                </ul>


    </section>
        )
    }
}


export default Sidebar;
