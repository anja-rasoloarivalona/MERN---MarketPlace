import React, { Component } from 'react';
import './Payment.css';
import UserInfo from '../Recap/UserInfo/UserInfo';
import { connect } from 'react-redux';

class Payment extends Component {
    render() {
        return (
            <div className="payment">
                <UserInfo />
                <section className="payment__delivery">
                    <div className="checkout__title__primary">DELIVERY METHOD</div>
                    <div className="payment__delivery__details">Wednesday, Aug. 14 - Tuesday, Aug. 20</div>
                    <div className="payment__delivery__details">$10</div>
                </section>

                <section>
                    <div className="checkout__title__primary">YOUR CART</div>

                    {this.props.products.map( prod => (
                        <div className="checkout__product">
                            <div>{prod.title}</div>
                            <div>${prod.price}</div>
                        </div>
                    ))}


                    <div>Subtotal: ${this.props.subTotalPrice}</div>
                    <div>Taxes: ${this.props.taxes}</div>
                    <div>Delivery fee: $10</div>
                    <div>Total: $900</div>
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
    }
}

export default connect(mapStateToProps)(Payment);
