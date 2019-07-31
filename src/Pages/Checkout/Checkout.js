import React, { Component } from 'react';
import './Checkout.css';
import IconSvg from '../../util/svgHandler';

import FormUserInfo from './FormUserInfo/FormUserInfo';
import Delivery from './Delivery/Delivery';
import Payment from './Payment/Payment';

class Checkout extends Component {

    state = {
        currentPage: 'checkout'
    }

    componentWillMount(){
        window.scroll(0, 0)
    }

    updatePage = nextPage => {
        this.setState({
            currentPage: nextPage
        }, console.log('state', this.state.currentPage))
    }


    render() {
        return (
            <div className="checkout">
                <div className="checkout__steps">
                    <div className="checkout__steps__line">
                        <div className="checkout__steps__line__bellow"></div>
                        <div className={["checkout__steps__line__upper",

                            this.state.currentPage === 'delivery' ? 'delivery' : '',
                            this.state.currentPage === 'payment' ? 'payment' : ''  
                        ].join(' ')}></div>

                        <span className={[
                            this.state.currentPage === 'delivery' ? 'delivery' : '',
                            this.state.currentPage === 'payment' ? 'payment' : '' 
                        ].join(' ')}>
                            <IconSvg icon="cart"/>
                        </span>
                        
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
                        <Delivery 
                        onValidate={this.updatePage}/>
                    )
                }

                {
                    this.state.currentPage === "payment" && (
                        <Payment />
                    )
                }

                


                
            </div>
            
        )
    }
}

export default Checkout;

