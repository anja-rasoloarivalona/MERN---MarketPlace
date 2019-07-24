import React, { Component } from 'react'
import './Sidebar.css';
import InputRange from '../../../components/FormInput/InputRange/InputRange';
import SidebarCategoryToggler from './SidebarToggler/SidebarCategoryToggler';
import SideBarCategoryList from './SidebarCategoryList/SidebarCategoryList';
import IconSvg from '../../../util/svgHandler';


class Sidebar extends Component {

    state = {
        hideCategoryFilter : false,
        hidePriceFilter: false,
        windowWidth: 0
    }

    componentWillMount(){
        this.setState({
            windowWidth : window.innerWidth,
            hideCategoryFilter: window.innerWidth < 1199 ? true : false,
            hidePriceFilter: window.innerWidth < 1199 ? true : false
        })      
    } 

    hideCategoryFilterHandler = ()=> {
        this.setState(prevstate => ({
            hideCategoryFilter: !prevstate.hideCategoryFilter
        }))
    }

    hideCategoryFilterHandlerOnMobile = () => {
        if(this.state.windowWidth < 1199){
            this.setState(prevstate => ({
                hideCategoryFilter: !prevstate.hideCategoryFilter
            }))
        }
    }


    hidePriceFilterHandler = ()=> {
        this.setState(prevstate => ({
            hidePriceFilter: !prevstate.hidePriceFilter
        }))
    }

    

    render() {

        return (
            <section className={["sidebar", 
                                 this.state.hideCategoryFilter === false ? 'sidebar--show__cat' : ' ',
                                 this.state.hidePriceFilter === false ? 'sidebar--show__price' : ' '].join(' ')}>

                <SidebarCategoryToggler hideCategoryFilterHandler = {this.hideCategoryFilterHandler} 
                                        hideCategoryFilter = {this.state.hideCategoryFilter}/>

                <SideBarCategoryList hideCategoryFilter = {this.state.hideCategoryFilter}
                                     hideCategoryFilterHandlerOnMobile ={this.hideCategoryFilterHandlerOnMobile}>

                <div className="sidebar__price">

                    <div className={["sidebar__price__title", "flex-centered-row", this.state.hidePriceFilter === false ? 'rotateIcon' : ''].join(' ')}
                        onClick = {this.hidePriceFilterHandler}>
                        <span>Filter by price:</span> 
                        <span>${this.props.priceRangeRequested.min} - ${this.props.priceRangeRequested.max}</span> 

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
                    <select value={this.props.sortBy}
                            name="filter" 
                            onChange={e => this.props.sortbyhandler(e)}>
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
