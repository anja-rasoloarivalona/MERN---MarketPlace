import React, { Component, Fragment } from 'react';
import './SingleProduct.css';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import {connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Backdrop from '../../components/Backdrop/Backdrop';
import IconSvg from '../../util/svgHandler';

import { FormattedMessage } from 'react-intl';





class SingleProduct extends Component {
    
    _isMounted = false;

    state = {
        id: this.props.match.params.prodId,
        title: '',
        description: '',
        category:'',
        price: 0,
        image: '',
        date: '',
        loading: false,
        pathToBack: '/',
        inCart: false,

        showBackdrop: false
    }

    componentDidMount(){

        console.log('show backdrop', this.state.showBackdrop)
        window.scrollTo(0, 0);

        let productsIdInCart = [];
        this.props.productsInCart.forEach( prod => {
            productsIdInCart = [...productsIdInCart, prod.productId]
        })

        if(productsIdInCart.includes(this.state.id)) {
            this.setState({inCart: true})
        }
        
        this.setState({loading: true});

        this._isMounted = true;
        const prodId = this.props.match.params.prodId;   
        
        fetch('https://strix-market-place.herokuapp.com/' + prodId, {
            method: 'GET'
        })
        .then( res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch product')
            }
            return res.json()
        })
        .then(resData => {
            if(this._isMounted === true){
                const date = resData.product.createdAt.slice(0, 10);
                this.setState({
                    title: resData.product.title,
                    price: resData.product.price,
                    category: resData.product.category,
                    image: 'https://strix-market-place.herokuapp.com/' + resData.product.imageUrl,
                    description: resData.product.description,
                    date: date,
                    loading: false,
                    pathToBack: this.props.category.length > 0 ?  "../" + resData.product.category : '/'
            })} 
            return
            })
        .catch( err => {
            this.setState({loading: false})
            console.log(err)
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    addProductToCartHandler = (data) => {


        this.setState({ inCart: true, showBackdrop: true})



       let productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
        let productData = {
            productId: data.id,
            title: data.title,
            description: data.description,
            category: data.category,
            price: data.price,
            image: data.image
        }
        let newProductsInCart = [];

        if(!productsInCart){
            newProductsInCart.push(productData);
        } else {
            newProductsInCart = [...productsInCart, productData];
        }
        
        localStorage.setItem('productsInCart', JSON.stringify(newProductsInCart))


        this.props.addProductToCart(
            data.id,
            data.title,
            data.description,
            data.category,
            data.price,
            data.image
        )
    }

    closeBackdrop = () => {
        this.setState({ showBackdrop: false})
    }

    render() {

        let product;
        if(this.state.loading === true) {
            product = <Spinner />
        } else {
            product =(
                <article>                   
                    <div className="single-product__details">
                        <h1 className="single-product__details__title">{this.state.title}</h1>
                        <div className="single-product__details__date">{this.state.date}</div>
                        <div className="single-product__details__price">${this.state.price}</div>
                        <p>{this.state.description}</p>
                        <div className="single-product__details__cta flex-centered-row">

                        { this.state.inCart ? (
                                <Button color='primary'
                                        link='../cart'>
                                    <FormattedMessage id='myCart' defaultMessage='My Cart'/>
                                </Button>
                            )  : (
                                <Button color='primary'
                                        onClick={this.addProductToCartHandler.bind(this, this.state)}>
                                    <FormattedMessage id='addToCart' defaultMessage='Add to cart'/>
                                </Button>
                            )}
                            


                            <Button color="secondary"
                                    link={{   
                                    pathname: this.state.pathToBack
                                    }}>      
                                <FormattedMessage id='back' defaultMessage='Back'/>
                            </Button>
                        </div>
                    </div> 
                    <div className="single-product__image" 
                            style={{
                                backgroundImage: `url('${this.state.image}')`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}>
                                
                    </div>                  
            </article> 
            )
        }
        return (
            <Fragment>
                {
                    this.state.showBackdrop && (
                        <Backdrop open={this.state.showBackdrop}
                        onClick={this.closeBackdrop}>
                            <div className="singleProduct__modal">


                                <div className="singleProduct__modal__top flex-centered-row">
                                    <IconSvg icon="check" size="small"/> <span>Product successfully added to your shopping cart</span> 
                                </div>

                               <div className="singleProduct__modal__body">

                                   
                                    <div className="singleProduct__modal__product">
                                            <div className="singleProduct__modal__product__title">{this.state.title}</div>
                                            <div className="singleProduct__modal__product__price">${this.state.price}</div>
                                            <div className="singleProduct__modal__product__image" 
                                                    style={{
                                                        backgroundImage: `url('${this.state.image}')`,
                                                        backgroundSize: 'contain',
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}>                              
                                            </div>         
                                    </div>

                                    <div className="singleProduct__modal__product__line"/>

                                    <div className="singleProduct__modal__cart">


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

                                        <div className="singleProduct__modal__cart__info"><b><FormattedMessage id='subtotal' defaultMessage='Subtotal'/>:</b> <span>${this.props.subTotalPrice}</span></div>
                                        <div className="singleProduct__modal__cart__info"><b><FormattedMessage id='taxes' defaultMessage='Taxes'/>:</b> <span>${this.props.taxes}</span></div>
                                        <div className="singleProduct__modal__cart__info"><b><FormattedMessage id='totalPrice' defaultMessage='Total Price'/>:</b> <span>${this.props.totalPrice}</span></div>

                                        <div className="singleProduct__modal__cart__cta flex-centered-row">
                                            <Button color="primary"
                                                    link='../cart'>
                                                <FormattedMessage id='myCart' defaultMessage='My cart'/>
                                            </Button>
                                            <Button color="secondary"
                                                    link="../">
                                                <FormattedMessage id='shop' defaultMessage='Shop'/>
                                            </Button>
                                            
                                        </div>
                                        
                                    </div>
                               </div>
                                
                             
                                
                            </div>
                        </Backdrop>
                    )
                }
               


                <section className="single-product flex-centered-row">
                    {product}     
                </section>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        category: state.products.category,
        productsInCart: state.cart.products,
        auth: state.auth.auth,


        totalProductsCount: state.cart.totalProductsCount,
        subTotalPrice: state.cart.subTotalPrice,
        taxes: state.cart.taxes,
        totalPrice: state.cart.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCart: (id, title, description, category, price, image) => dispatch(actions.addProductToCart(id, title, description, category, price, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
