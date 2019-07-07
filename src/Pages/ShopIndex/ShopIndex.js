import React, { Component, Fragment } from 'react'
import './ShopIndex.css';
import Product from '../../components/Product/Product';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import bg from '../../assets/img/bg.jpg';


 class ShopIndex extends Component {

    _isMounted = false;

    state = {
        products: [],
        status: '',
        productPriceRequested : {min: 20, max: 500},
        priceMin: 0,
        priceMax: 2000, 
    }



    componentDidMount(){
        console.log(this.props.match.params)
        
        this._isMounted = true;
        this.loadProductsHandler();
    }

    componentDidUpdate(){
        this.loadProductsHandler();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }
 

    loadProductsHandler = () => {

            fetch('http://localhost:8000')
            .then(res => {
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
                console.log(err)
            })
    }
       
  

    inputRangeChangeHandler = value => {
        this.setState({productPriceRequested : value})
    }

    render() {
       
        return (
            <Fragment>
        
                <Sidebar 
                     maxPriceRequested = {this.state.priceMax} 
                     minPriceRequested = {this.state.priceMin}
                     inputRangeValue = {this.state.productPriceRequested}
                     onInputRangeChange = {this.inputRangeChangeHandler}
                     minPrice = {this.state.productPriceRequested.min}
                     maxPrice = {this.state.productPriceRequested.max}
                />

                <section className="shop__intro" style={{
                                backgroundImage: `url('${bg}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                        }} >
                
                </section>
                
                <section className="shop">
                
                    {
                        this.state.products.map(product => {
                            const date = product.createdAt.slice(0, 10);
                            return <Product
                                        shop
                                        key={product._id}
                                        id={product._id}
                                        title={product.title}
                                        price={product.price}
                                        category = {product.category}
                                        description={product.description}
                                        date = {date}
                                        imageUrl = {'http://localhost:8000/' + product.imageUrl }
                                    />
                        })
                   }             
                    
                </section>
            </Fragment>
        )
    }
}


export default ShopIndex
