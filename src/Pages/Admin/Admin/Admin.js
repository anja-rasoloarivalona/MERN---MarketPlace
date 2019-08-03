import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Admin.css';


import ErrorHandler from '../../../components/ErrorHandler/ErrorHandler';
import Spinner from '../../../components/Spinner/Spinner';
import Backdrop from '../../../components/Backdrop/Backdrop';
import AdminProducts from '../AdminProducts/AdminProducts';




class Admin extends Component {

    state = {
        showBackdrop: false,
        error: null,
        loading: false,
        currentPage: 'products'
    }
    render() {
        return (
            <div className="admin">
                <nav className="admin__nav">
                    <NavLink to="admin/products"
                             className="admin__nav__link">
                        Products
                    </NavLink>
                    <NavLink to="admin/orders"
                            className="admin__nav__link">
                        Orders
                    </NavLink>
                </nav>


                
                {
                    this.state.currentPage === 'products' && (
                        <AdminProducts />
                    )
                }
            </div>
        )
    }
}



export default Admin;
