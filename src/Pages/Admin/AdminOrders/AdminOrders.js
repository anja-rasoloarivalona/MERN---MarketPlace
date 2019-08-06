import React, { Component } from 'react';
import './AdminOrders.css';


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

       let orders = this.state.orders.map( order => {
           return (
                <div className="admin-order"
                     key={order.shortId}>
                    <h2>Order: {order.shortId}</h2>
                    <div className="admin-order__products-list">
                        {
                            order.cart.items.map( prod => {
                               return (
                                   <div className="admin-order__product">
                                       <div>{prod.product.title}</div>
                                       <div>{prod.product.price}</div>
                                   </div>
                               )

                            })
                        }
                    </div>
                </div> 
           )
        })


        return (
            <div className="admin-orders-container">
                    {orders}
                   
            </div>
        )
    }
}

export default  AdminOrders;
