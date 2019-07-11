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
        console.log('cat clicked')
        this.setState(prevstate => ({
            hideCategoryFilter: !prevstate.hideCategoryFilter
        }))
    }

    hidePriceFilterHandler = ()=> {
        console.log('clicked')
        this.setState(prevstate => ({
            hidePriceFilter: !prevstate.hidePriceFilter
        }))
    }

    render() {

        return (
            <section className={["sidebar", 
                                 this.state.hideCategoryFilter === false ? 'sidebar--show' : ' ',
                                 this.state.hidePriceFilter === false ? 'sidebar--show' : ' '].join(' ')}>

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


                <div className={["sidebar__sort", this.state.hidePriceFilter ? "sidebar__sort__goTop" : ''].join(' ')}>
                    <span>
                        Sort by
                    </span>
                    <select name="filter" onChange={e => this.props.sortbyhandler(e)}>
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
