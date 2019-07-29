import React, { Component, Fragment } from 'react'
import './Cart.css';
import Product from '../../components/Product/Product';
import { connect } from 'react-redux';
import Button from '../../components/Button/Button';

class Cart extends Component {

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    clearCart(){
        localStorage.removeItem('productsInCart')
    }

    render() {
        return (
            <Fragment>
            <div className='cart'>
                {this.props.products.map(product => {
                        return (
                            <Product 
                                shop
                                key={product.productId}
                                id={product.productId}
                                title={product.title}
                                price={product.price}
                                category={product.category}
                                description={product.description}
                                imageUrl= {product.image}
                            />
                        )
                }
                
               )}
               <div className="cart__details">
                   <span>Total of Products:  {this.props.totalProductsCount}</span>
                   <span>Subtotal: {this.props.subTotalPrice}</span>
                   <span>Taxes: {this.props.taxes}</span>
                   <span>Total Price:{this.props.totalPrice}</span>
               </div>
               <div className="cart__cta">
                    <Button onClick={this.clearCart}
                            color='secondary'>
                        Clear Cart
                    </Button>
                    <Button color='primary'>
                        Checkout
                    </Button>
               </div>
               
            </div>
            
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.cart.products,
        totalProductsCount: state.cart.totalProductsCount,
        subTotalPrice: state.cart.subTotalPrice,
        taxes: state.cart.taxes,
        totalPrice: state.cart.totalPrice
    }
}
export default connect(mapStateToProps)(Cart);
