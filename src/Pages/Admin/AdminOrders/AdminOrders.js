import React, { Component } from 'react';
import './AdminOrders.css';
import IconSvg from '../../../util/svgHandler';
import Spinner from '../../../components/Spinner/Spinner';
import { FormattedMessage } from 'react-intl';


class AdminOrders extends Component {

    state = {
        orders:  [],
        loading: false,
    }

    componentWillMount(){
        window.scrollTo(0, 0);
    }

    componentDidMount(){
        const token = localStorage.getItem('token');

        this.setState({loading: true})

        if(token){
            fetch('https://strix-market-place.herokuapp.com/order/',
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
                    orders: resData.orders,
                    loading: false
                }, () => {
                    console.log(this.state.orders)
                })
        })
        .catch( err => {
            this.setState({loading: false})
            console.log(err)
        })


        }
    }
    render() {

        let orders;


        if(this.state.loading){
            orders = (
                <div className="flex-centered-row admin-order__spinner">
                    <Spinner />
                </div>
            ) 
        } else {
            if(this.state.orders.length > 0) {
                orders = this.state.orders.map( order => {
                    return (
                         <div className="admin-order"
                              key={order.shortId}>

                            <div className="admin-order__top">
                                <h2><FormattedMessage id="order" defaultMessage="Order"/>: {order.shortId}</h2>
                            </div>   
                            
         
                             <div className="admin-order__body">             
                                 <div className="admin-order__products-list">
                                     <div className="admin-order__title"><FormattedMessage id="items" defaultMessage="Items"/></div>
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
                                         <span><FormattedMessage id="subtotal" defaultMessage="Subtotal"/>: </span><span>${order.cart.subTotalPrice}</span>
                                     </div>
                                     <div className="admin-order__details">
                                         <span><FormattedMessage id="taxes" defaultMessage="Taxes"/>: </span><span>${order.cart.taxes}</span>
                                     </div>
                                     <div className="admin-order__details">
                                         <span><FormattedMessage id="delivery" defaultMessage="Delivery"/>: </span><span>${order.cart.deliveryFee}</span>
                                     </div>
                                     <div className="admin-order__details">
                                         <span className="admin-order__details--total" >Total: </span> <span className="admin-order__details--total">${order.cart.totalPrice}</span>
                                     </div>       
                                 </div>
                         
                                 <div className="amdin-order__delivery">
                                     <div className="admin-order__title"><FormattedMessage id="delivery" defaultMessage="Delivery"/></div>
         
                                     <div className="amdin-order__delivery__details">
                                         <div>{order.address.fullname}</div>
                                         <div>{order.address.address1}</div>
                                         <div>{order.address.address2}</div>
                                         <div>{order.address.city}, {order.address.zip}</div>
                                         <div>{order.address.state}</div>
                                     </div>
         
                                     <div>
                                         <span className="admin-order__delivery__date">{order.deliveryDate}</span>
                                     </div>
                                 </div>
                             </div>
                             
                         </div> 
                    )
                 })
            } else {
                orders = (
                    <div className="no-order flex-centered-column">
                        <IconSvg icon="happy"/> <span><FormattedMessage id="noOrders" defaultMessage="You do not have any orders yet"/></span>
                    </div>
    
                )
            }
        }

        return (
            <div className="admin-orders-container">
                    {orders}                 
            </div>
        )
    }
}

export default  AdminOrders;
