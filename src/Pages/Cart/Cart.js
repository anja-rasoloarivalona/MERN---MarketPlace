import React, { Component, Fragment } from 'react'
import './Cart.css';
import Product from '../../components/Product/Product';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '../../components/Button/Button';

class Cart extends Component {

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    deleteProductHandler(data){
        let productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
        let updatedProductsInCart =  productsInCart.filter( prod =>  prod.productId !== data.productId)
        localStorage.setItem('productsInCart', JSON.stringify(updatedProductsInCart));

        this.props.deleteProduct(data.productId, data.price)
    }


    render() {
        return (
            <Fragment>
            <div className='cart'>
                {this.props.products.map(product => {
                    let image;
                    if(product.image) {
                        image = product.image
                    } else {
                        image = "https://strix-market-place.herokuapp.com/" + product.imageUrl
                    }
                        return (
                            <Product 
                                cart
                                key={product.productId}
                                id={product.productId}
                                title={product.title}
                                price={product.price}
                                category={product.category}
                                description={product.description}
                                imageUrl= {image}
                                onDelete={this.deleteProductHandler.bind(this, product)}
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
                    <Button onClick={this.props.clearProductsInCart}
                            color='secondary'>
                        Clear Cart
                    </Button>
                    <Button color='primary'
                            link={this.props.isAuth ? '/checkout' : '/login'}>
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
        totalPrice: state.cart.totalPrice,

        isAuth: state.auth.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearProductsInCart: () => dispatch(actions.clearProductsInCart()),
        deleteProduct: (id, price) => dispatch(actions.deleteProduct(id, price))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
