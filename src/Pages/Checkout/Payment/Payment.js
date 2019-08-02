import React, { Component } from 'react';
import './Payment.css';
import UserInfo from '../Recap/UserInfo/UserInfo';
import { connect } from 'react-redux';
import Button from '../../../components/Button/Button';
import * as actions from '../../../store/actions/index';

class Payment extends Component {

    state = {
        data: {
            products: this.props.products,
            totalProductsCount: this.props.totalProductsCount,
            subTotalPrice: this.props.subTotalPrice,
            taxes: this.props.taxes,
            deliveryPrice: this.props.deliveryInfos.price,
            totalPrice: this.props.totalPrice,
            address: this.props.address,
            deliveryDate: this.props.deliveryInfos.date
        }
    }

    componentDidMount(){
        console.log('payment mounted', this.state.data.address)
    }

    postOrderHandler = () => {

       // this.props.postOrder(this.state.data);

        const token = localStorage.getItem('token');
        const formOrderData = new FormData();

    formOrderData.append('address', this.state.data.address._id);
    formOrderData.append('products', JSON.stringify(this.state.data.products));
    formOrderData.append('deliveryDate', this.state.data.deliveryDate);
    formOrderData.append('subTotalPrice', this.state.data.subTotalPrice);
    formOrderData.append('taxes', this.state.data.taxes);
    formOrderData.append('deliveryPrice', this.state.data.deliveryPrice);
    formOrderData.append('totalPrice', this.state.data.totalPrice);
    formOrderData.append('totalProductsCount', this.state.data.totalProductsCount);

    if(token){
        fetch('http://localhost:8000/cart/order/' , {
            headers: {
                Authorization: 'Bearer ' + token
            },
            method: 'POST',
            body: formOrderData
        })
        .then(res => {
            if(res.status !== 200 && res.status !==201){
                throw new Error('Post order failed')
            }

            return res.json();
       })
       .then( resData => {
           console.log(resData)
       })
       .catch(err => {
           console.log(err)
       })
    }
}

  
    render() {


        let paymentData = {
            products: this.props.products,
            totalProductsCount: this.props.totalProductsCount,
            subTotalPrice: this.props.subTotalPrice,
            taxes: this.props.taxes,
            deliveryPrice: this.props.deliveryInfos.price,
            totalPrice: this.props.totalPrice,
            address: this.props.address,
            deliveryDate: this.props.deliveryInfos.date
        }


        return (
            <div className="payment">
                <UserInfo />
                <section className="payment__delivery">
                    <div className="checkout__title__primary">DELIVERY</div>
                    <div className="payment__delivery__details">{this.props.deliveryInfos.date}</div>
                    <div className="payment__delivery__details">price: ${this.props.deliveryInfos.price}</div>
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
                            <span className='payment__price'>${this.props.deliveryInfos.price}</span>
                    </div>
                    <div className='payment__cart__details'>
                            <span className='payment__cart__details__total'>Total:</span> 
                            <span className='payment__price'>${this.props.totalPrice}</span>
                    </div>
                    <div className="payment__cta">
                            <Button color="primary"
                                    onClick={this.postOrderHandler}>
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
        totalProductsCount: state.cart.totalProductsCount,
        subTotalPrice: state.cart.subTotalPrice,
        taxes: state.cart.taxes,
        totalPrice: state.cart.totalPrice,
        address: state.cart.userInfos,
        deliveryInfos: state.cart.deliveryInfos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postOrder: (paymentData) => dispatch(actions.postOrder(paymentData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
