import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Admin.css';
import Button from '../../../components/Button/Button';


import ErrorHandler from '../../../components/ErrorHandler/ErrorHandler';
import Spinner from '../../../components/Spinner/Spinner';
import Backdrop from '../../../components/Backdrop/Backdrop';

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
                    <Button 
                            color='secondary'
                            onClick={this.updatePage.bind(this, 'orders')}>
                        Orders
                    </Button>
                    <Button     
                             color='secondary'
                             onClick={this.updatePage.bind(this, 'products')}>
                        Products
                    </Button>
                    
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
