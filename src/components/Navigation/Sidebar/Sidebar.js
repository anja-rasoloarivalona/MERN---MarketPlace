import React, { Component } from 'react'
import './Sidebar.css';
import InputRange from '../../../components/FormInput/InputRange/InputRange';
import SidebarCategoryToggler from './SidebarToggler/SidebarCategoryToggler';
import SideBarCategoryList from './SidebarCategoryList/SidebarCategoryList';


class Sidebar extends Component {
    state = {
        hideCategoryFilter : false,
    }

    hideCategoryFilterHandler = ()=> {
        this.setState(prevstate => ({
            hideCategoryFilter: !prevstate.hideCategoryFilter
        }))
    }

    render() {

        return (
            <section className="sidebar">

                <SidebarCategoryToggler hideCategoryFilterHandler = {this.hideCategoryFilterHandler}/>

                <SideBarCategoryList hideCategoryFilter = {this.state.hideCategoryFilter}/>
     
                
                <div className="sidebar__price">
                    <span className="sidebar__price__title">
                        Filter by price : ${this.props.minPrice} - ${this.props.maxPrice}
                    </span>  
                        <InputRange {...this.props}/>
                </div>

        </section>
        )
    }
}


export default Sidebar;
