import React, { Component } from 'react';
import './AdminOrders.css';
import IconSvg from '../../../util/svgHandler';


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

        let orders;

        
        if(this.state.orders.length > 0) {
            orders = this.state.orders.map( order => {
                return (
                     <div className="admin-order"
                          key={order.shortId}>
                         <h2>Order: {order.shortId}</h2>
     
                         <div className="admin-order__body">             
                             <div className="admin-order__products-list">
                                 <div className="admin-order__title">Items</div>
                                 {
                                     order.cart.items.map( prod => {
                                     return (
                                         <div className="admin-order__details">
                                             <div>{prod.product.title}</div>
                                             <div>${prod.product.price}</div>
                                         </div>
                                     )
                                     })
                                 }
     
                                 <div className="admin-order__details admin-order__details--price">
                                     <span>Subtotal: </span><span>${order.cart.subTotalPrice}</span>
                                 </div>
                                 <div className="admin-order__details">
                                     <span>Taxes: </span><span>${order.cart.taxes}</span>
                                 </div>
                                 <div className="admin-order__details">
                                     <span>Delivery: </span><span>${order.cart.deliveryFee}</span>
                                 </div>
                                 <div className="admin-order__details">
                                     <span className="admin-order__details--total" >Total: </span> <span className="admin-order__details--total">${order.cart.totalPrice}</span>
                                 </div>       
                             </div>
     
     
     
                             <div className="amdin-order__delivery">
                                 <div className="admin-order__title">Delivery</div>
     
                                 <div className="amdin-order__delivery__details">
                                     <div>{order.address.fullname}</div>
                                     <div>{order.address.address1}</div>
                                     <div>{order.address.address2}</div>
                                     <div>{order.address.city}, {order.address.zip}</div>
                                     <div>{order.address.state}</div>
                                 </div>
     
                                 <div>
                                     <span className="admin-order__delivery__date">Date: {order.deliveryDate}</span>
                                 </div>
                             </div>
                         </div>
                         
                     </div> 
                )
             })
        } else {
            orders = (
                <div className="no-order flex-centered-column">
                    <IconSvg icon="happy"/> <span>You do not have any orders yet</span>
                </div>

            )
        }

       


        return (
            <div className="admin-orders-container">
                    {orders}                 
            </div>
        )
    }
}

export default  AdminOrders;
