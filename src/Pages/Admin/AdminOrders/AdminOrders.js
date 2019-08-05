import React, { Component } from 'react';
import './AdminOrders.css';
import { Connect } from 'react-redux';

class AdminOrders extends Component {

    state = {
        orders:  []
    }

    componentDidMount(){
        const token = localStorage.getItem('token');

        if(token){
            fetch('http://localhost:8000/order/',
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then( res => {
            if(res.status !== 200){
                throw new Error('failed to fetch products')
            }

            return res.json();
        })
        .then(resData => {
                this.setState({
                    orders: resData.orders
                }, () => {
                    console.log(this.state.orders)
                })
        })
        .catch( err => {
            console.log(err)
        })


        }
    }
    render() {

        let orders = this.state.orders.map( i => {
           return (
                <div>{i.deliveryDate}</div> 
           )
        })


        return (
            <div className="admin-orders">
                    {orders}
            </div>
        )
    }
}

export default  AdminOrders;
