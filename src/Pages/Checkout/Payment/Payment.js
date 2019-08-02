import React, { Component } from 'react';
import './Payment.css';
import UserInfo from '../Recap/UserInfo/UserInfo';
import { connect } from 'react-redux';
import Button from '../../../components/Button/Button';

class Payment extends Component {
    render() {
        return (
            <div className="payment">
                <UserInfo />
                <section className="payment__delivery">
                    <div className="checkout__title__primary">DELIVERY</div>
                    <div className="payment__delivery__details">{this.props.delivery.date}</div>
                    <div className="payment__delivery__details">price: ${this.props.delivery.price}</div>
                </section>

                <section className="payment__summary">

                    <div className="checkout__title__primary">YOUR CART</div>

                    {this.props.products.map( prod => (
                        <div className="payment__product">
                            <div className="payment__product__imageAndTitle">
                                <div className="payment__product__image" 
                                    style={{
                                        backgroundImage: `url('https://strix-market-place.herokuapp.com/${prod.imageUrl}')`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }} />
                                <div className='payment__product__title'>{prod.title}</div>
                            </div>                       
                            <div className='payment__price'>${prod.price}</div>          
                        </div>
                    ))}


                    
                    <div className='payment__cart__details'>
                            <span>Taxes:</span> 
                            <span className='payment__price'>${this.props.taxes}</span>
                    </div>
                    <div className='payment__cart__details'>
                            <span>Delivery fee:</span> 
                            <span className='payment__price'>${this.props.delivery.price}</span>
                    </div>
                    <div className='payment__cart__details'>
                            <span className='payment__cart__details__total'>Total:</span> 
                            <span className='payment__price'>${this.props.totalPrice}</span>
                    </div>
                    <div className="payment__cta">
                            <Button color="primary">
                                Pay now
                            </Button>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return  {
        products: state.cart.products,
        subTotalPrice: state.cart.subTotalPrice,
        taxes: state.cart.taxes,
        delivery: state.cart.deliveryInfos,
        totalPrice: state.cart.totalPrice
    }
}

export default connect(mapStateToProps)(Payment);
