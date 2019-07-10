import React, { Component, Fragment } from 'react'
import './ShopByCategory.css';
import Product from '../../../components/Product/Product';
import ShopLayout from '../Shop';



 class ShopIndex extends Component {

    _isMounted = false;

    state = {
        products: [],
        status: '',
        productPriceRequested : {min: 20, max: 500},
        priceMin: 0,
        priceMax: 2000, 
        category: this.props.match.params.category,
    }



    componentDidMount(){        
        this._isMounted = true;
        this.loadProductsHandler();
    }

   

    componentWillReceiveProps(nextProps){
        this._isMounted = true;
        if(nextProps.match.params.category === this.state.category){
            return
        } else {
            this.setState({category: nextProps.match.params.category}, () => {
                this.loadProductsHandler()
            }); 
        }
        
       
    }



    componentWillUnmount(){
        this._isMounted = false;
    }
 

    loadProductsHandler = () => {
            fetch('http://localhost:8000/' + this.state.category)
            .then(res => {
                console.log(this.state.category)
                if(res.status !== 200){
                    throw new Error('Failed to fectch products')
                }

                return res.json(); //extract the body
            })
            .then(resData => {

                if(this._isMounted === true) {
                    this.setState({
                        products: resData.products,
                    })
                }

                return null;
                
            })
            .catch( err => {
                if(err){
                    console.log(err)
                }
               
            })
    }


  

    inputRangeChangeHandler = value => {
        this.setState({productPriceRequested : value})
    }

    render() {      
        return (
            
                <ShopLayout 
                    priceMax ={this.state.priceMax}
                    priceMin = {this.state.priceMin}
                    productPriceRequested={this.state.productPriceRequested}
                    inputRangeChangeHandler={this.inputRangeChangeHandler}
                    minPrice = {this.state.productPriceRequested.min}
                    maxPrice ={this.state.productPriceRequested.max}
                    >

                    <section className="shop--category">                
                        {
                            this.state.products.map(product => {
                            /*  const date = product.createdAt.slice(0, 10);*/
                                    let date = product.createdAt.toString().split('T')[0];
                                    let hour = product.createdAt.toString().split('T')[1].slice(0, 8);

                                    let fullDate = date + ' ' + hour                       

                                return <Product
                                            shop
                                            key={product._id}
                                            id={product._id}
                                            title={product.title}
                                            price={product.price}
                                            category = {product.category}
                                            description={product.description}
                                            date = {fullDate}
                                            imageUrl = {'http://localhost:8000/' + product.imageUrl }
                                        />
                            })
                    }                               
                    </section>
                    </ShopLayout>
        
        
        )}
}


export default ShopIndex
