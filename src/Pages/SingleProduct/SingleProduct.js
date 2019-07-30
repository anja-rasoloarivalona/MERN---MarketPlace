import React, { Component } from 'react';
import './SingleProduct.css';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import {connect } from 'react-redux';
import * as actions from '../../store/actions/index';





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
        pathToBack: '/'
    }

    componentDidMount(){
        window.scrollTo(0, 0);

       

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
                            <Button color='primary'
                                    onClick={this.addProductToCartHandler.bind(this, this.state)}

                                 /*   onClick={this.props.addProductToCart(
                                        this.state.id,
                                        this.state.title,
                                        this.state.description,
                                        this.state.category,
                                        this.state.price,
                                        this.state.image)}    */>
                                Add to cart
                            </Button>
                            <Button color="secondary"
                                    link={{   
                                    pathname: this.state.pathToBack
                                    }}>      
                                Back
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
            <section className="single-product flex-centered-row">
                {product}     
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        category: state.products.category,
        auth: state.auth.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCart: (id, title, description, category, price, image) => dispatch(actions.addProductToCart(id, title, description, category, price, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
