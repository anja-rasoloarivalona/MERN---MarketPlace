import React, { Component, Fragment } from 'react'
import './Cart.css';
import Product from '../../components/Product/Product';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '../../components/Button/Button';
import IconSvg from '../../util/svgHandler';
import { FormattedMessage } from 'react-intl';

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

        let cart;

        if(this.props.products.length > 0){
            cart = (
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


                <div className="cart__summary flex-centered-column">
                    
                    <div className="cart__details">
                        <div className="cart__details__count">

                        {this.props.totalProductsCount > 1 ? (
                                <div>
                                    <FormattedMessage id='thereAre' defaultMessage='There are '/>
                                    {this.props.totalProductsCount} 
                                    <FormattedMessage id='itemsInYourCart' defaultMessage=' items in your cart'/>
                                </div>
                                        ): (
                                <div>
                                    <FormattedMessage id='thereIs' defaultMessage='There is ' />
                                    {this.props.totalProductsCount} 
                                    <FormattedMessage id='itemInYourCart' defaultMessage=' item in your cart'/>
                                </div>
                        )}

                        </div>
                        <div className="cart__details__price"><span><FormattedMessage id='subtotal' defaultMessage='Subtotal'/>: </span><span>${this.props.subTotalPrice}</span></div>
                        <div className="cart__details__price"><span><FormattedMessage id='taxes' defaultMessage='Taxes'/>: </span><span>${this.props.taxes}</span></div>
                        <div className="cart__details__price"><span><FormattedMessage id='totalPrice' defaultMessage='Total Price'/>:</span><span>${this.props.totalPrice}</span></div>
                    </div>


                    <div className="cart__cta">
                            <Button onClick={this.props.clearProductsInCart}
                                    color='secondary'>
                                <FormattedMessage id='clearCart' defaultMessage='Clear Cart'/>
                            </Button>
                            <Button color='primary'
                                    link={this.props.isAuth ? '/checkout' : '/login'}>
                                <FormattedMessage id='checkout' defaultMessage='Checkout'/>
                            </Button>
                    </div>
                </div>

               
               
            </div>
            
            </Fragment>
            )
        } else {
            cart = (
                
                    <div className="no-product-inCart">
                        <div>
                            <IconSvg icon="happy"/> <span><FormattedMessage id="noItemsInCart" defaultMessage="There are no items in your cart"/></span>
                        </div>
                        <Button color='primary'
                            link='/'>
                            <FormattedMessage id="shop" defaultMessage="Shop"/>
                        </Button>
                    </div>                 
                
            )
        }

        
        return cart
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
