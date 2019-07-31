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

                    
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return  {
        products: state.cart.products
    }
}

export default connect(mapStateToProps)(Payment);
