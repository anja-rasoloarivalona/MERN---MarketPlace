import React, { Component } from 'react';
import './Checkout.css';
import Button from '../../components/Button/Button';
import IconSvg from '../../util/svgHandler';

import FormUserInfo from './FormUserInfo/FormUserInfo';
import Delivery from './Delivery/Delivery';

class Checkout extends Component {

    state = {
        currentPage: 'checkout'
    }

    updatePage = nextPage => {
        this.setState({
            currentPage: nextPage
        })
    }


    render() {
        return (
            <div className="checkout">
                <div className="checkout__steps">
                    <div className="checkout__steps__line">
                        <div className="checkout__steps__line__bellow"></div>
                        <div className="checkout__steps__line__upper"></div>
                        <IconSvg icon="cart"/>
                    </div>
                    <div className="checkout__steps__name">
                        <div>Information</div>
                        <div>Delivery</div>
                        <div>Payment</div>
                        <div>Validation</div>
                    </div>
                </div>

                {
                    this.state.currentPage === 'checkout' && (
                        <FormUserInfo 
                        onValidate={this.updatePage} />
                    )
                }

                {
                    this.state.currentPage === 'delivery' && (
                        <Delivery />
                    )
                }

                


                
            </div>
            
        )
    }
}

export default Checkout;

