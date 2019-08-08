import React, { Component } from 'react';
import './Admin.css';

import AdminProducts from '../AdminProducts/AdminProducts';
import AdminOrders from '../AdminOrders/AdminOrders';




class Admin extends Component {

    state = {
        showBackdrop: false,
        error: null,
        loading: false,
        currentPage: 'orders'
    }


 

    updatePage = page => {
        this.setState({
            currentPage: page
        })
    }
    render() {
        return (
            <div className="admin">
                <nav className="admin__nav">
                    <button 
                            onClick={this.updatePage.bind(this, 'orders')}
                            className={["admin__nav__button", 
                            this.state.currentPage === 'orders' ? 'active' : ' '].join(' ')}>
                        Orders
                    </button>
                    <button onClick={this.updatePage.bind(this, 'products')}
                            className={["admin__nav__button", 
                            this.state.currentPage === 'products' ? 'active' : ' '].join(' ')}>
                        Products
                    </button>
                    
                </nav>


                
                {
                    this.state.currentPage === 'products' && (
                        <AdminProducts />
                    )
                }
                {
                    this.state.currentPage === 'orders' && (
                        <AdminOrders />
                    )
                }
            </div>
        )
    }
}



export default Admin;
