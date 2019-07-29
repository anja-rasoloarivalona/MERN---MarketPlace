import React, { Component, Fragment } from 'react'
import './Cart.css';
import Product from '../../components/Product/Product';
import { connect } from 'react-redux';

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
               <button onClick={this.clearCart}>
                Clear Cart
                </button>
            </div>
            
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.cart.products
    }
}
export default connect(mapStateToProps)(Cart);
