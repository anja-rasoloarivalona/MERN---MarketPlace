import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './ShopByCategory.css';
import Product from '../../../components/Product/Product';
import ShopLayout from '../Shop';
import Paginator from '../../../components/Paginator/Paginator';
import Spinner from '../../../components/Spinner/Spinner';
import NoProductFound from '../../../components/NoProductFound/NoProductFound';



 class ShopIndex extends Component {

    _isMounted = false;

    state = {
        products: [],
        status: '',
        productPriceRequested : {min: 1, max: 99998},
        priceMin: 0,
        priceMax: 99999, 
        category: this.props.match.params.category,
        sortBy: 'latest',
        totalProducts: 0,
        currentPage: 1,
        loading: false
    }



    componentDidMount(){        
        this._isMounted = true;
        this.loadProductsHandler();
        window.scrollTo(0, 0);
    }

    componentWillUpdate(){
        window.scrollTo(0, 0);
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
 

    loadProductsHandler = direction => {
        this.setState({loading: true});
        if(direction){
            this.setState( {products: []} )
        }

        let currentPage = this.state.currentPage;

        if(direction === 'next'){
            currentPage++;
            this.setState({currentPage: currentPage})
        }

        if(direction === 'previous'){
            currentPage--;
            this.setState({currentPage: currentPage})
        }

            fetch('http://localhost:8000/' + 
                   this.state.category + '/' + 
                   this.state.productPriceRequested.min + '&&' + this.state.productPriceRequested.max + '/' +
                   this.state.sortBy +
                   '?page=' + currentPage
                   )
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
                        totalProducts: resData.totalProducts,
                        loading: false
                    })
                }

                return null;
                
            })
            .catch( err => {
                if(err){
                    this.setState({loading: false})
                    console.log(err)
                }
               
            })
    }

    inputRangeChangeHandler = value => {
        this.setState({productPriceRequested : value})
    }

    onChangeComplete = value => {   
        this.setState({productPriceRequested : value}, 
            () => this.loadProductsHandler())
    }

    sortbyhandler = event => {
        event.preventDefault();
        this.setState({sortBy : event.target.value}, 
            () => this.loadProductsHandler())
    }


    render() {  
        
        let products;
        if(this.state.loading === true){
            products = <Spinner />
        } else { if(this.state.totalProducts < 1){
            products = <NoProductFound />
        } else {
            products = (
                         
                <Paginator onRequestPreviousPage={this.loadProductsHandler.bind(this, 'previous')}
                                        onRequestNextPage={this.loadProductsHandler.bind(this, 'next')}
                                        lastPage={Math.ceil(this.state.totalProducts / 5)}
                                        currentPage={this.state.currentPage}>              
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
                        })}  
                </Paginator> 
            )       
        }
            
        }
        return (
            
                <ShopLayout 
                    priceMax ={this.state.priceMax}
                    priceMin = {this.state.priceMin}
                    productPriceRequested={this.state.productPriceRequested}
                    onChangeComplete = {this.onChangeComplete}
                    inputRangeChangeHandler={this.inputRangeChangeHandler}
                    minPrice = {this.state.productPriceRequested.min}
                    maxPrice ={this.state.productPriceRequested.max}
                    sortbyhandler = {this.sortbyhandler}
                    >

                    <section className="shop--category"> 
                        <div className="shop--category__title">
                            <Link to='/'>Home</Link> <span></span> > {this.state.category}
                        </div> 
                        {products}             
                    </section>
                    </ShopLayout>
        
        
        )}
}


export default ShopIndex
