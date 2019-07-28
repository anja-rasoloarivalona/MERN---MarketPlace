import React, { Component } from 'react';
import './SingleProduct.css';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import {connect } from 'react-redux';





class SingleProduct extends Component {

    _isMounted = false;

    state = {
        title: '',
        description: '',
        category:'',
        price: '',
        image: '',
        date: '',
        loading: false,
        pathToBack: '/'
    }

    componentDidMount(){

        console.log('single product did mount', this.props.category)
        console.log('test return to category', this.props.category != undefined) /* If true, return to category*/

        window.scrollTo(0, 0);
        this.setState({loading: true})
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

            console.log('back at',this.state.pathToBack);

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
                            <Button color='primary'>
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
        category: state.products.category
    }
}

export default connect(mapStateToProps)(SingleProduct);
