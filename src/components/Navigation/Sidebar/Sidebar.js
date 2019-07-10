import React, { Component } from 'react'
import './Sidebar.css';
import InputRange from '../../../components/FormInput/InputRange/InputRange';
import SidebarCategoryToggler from './SidebarToggler/SidebarCategoryToggler';
import SideBarCategoryList from './SidebarCategoryList/SidebarCategoryList';
import IconSvg from '../../../util/svgHandler';


class Sidebar extends Component {
    state = {
        hideCategoryFilter : false,
        hidePriceFilter: false
    }

    hideCategoryFilterHandler = ()=> {
        this.setState(prevstate => ({
            hideCategoryFilter: !prevstate.hideCategoryFilter
        }))
    }

    hidePriceFilterHandler = ()=> {
        this.setState(prevstate => ({
            hidePriceFilter: !prevstate.hidePriceFilter
        }))
    }

    render() {

        return (
            <section className="sidebar">

                <SidebarCategoryToggler hideCategoryFilterHandler = {this.hideCategoryFilterHandler}/>

                <SideBarCategoryList hideCategoryFilter = {this.state.hideCategoryFilter}
                                    >

                <div className="sidebar__price">

                    <div className="sidebar__price__title flex-centered-row"
                        onClick = {this.hidePriceFilterHandler}>
                        <span>Filter by price:</span> 
                        <span>${this.props.minPrice} - ${this.props.maxPrice}</span> 

                        <IconSvg icon="down"/>
                    </div>  

                    <div className={["sidebar__price__input", "flex-centered-row",
                            this.state.hidePriceFilter ? 'sidebar__price__input--hide' : ''].join(' ')}>
                        <InputRange {...this.props}/>
                    </div>  
                </div>


                <div className={["sidebar__date", this.state.hidePriceFilter ? "sidebar__date__goTop" : ''].join(' ')}>
                    <span>
                        Sort by
                    </span>
                    <select name="filter">
                        <option value="latest">latest</option>
                        <option value="low_to_high">price: low to high</option>
                        <option value="high_to_low">price: high to low</option>
                    </select>
                    
                </div>
              
                </SideBarCategoryList>
     
                
                

                

            </section>
        )
    }
}


export default Sidebar;
