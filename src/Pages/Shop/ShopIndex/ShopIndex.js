import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import './ShopIndex.css';
import Product from '../../../components/Product/Product';
import bg from '../../../assets/img/bg.jpg';
import ShopLayout from '../Shop';
import Paginator from '../../../components/Paginator/Paginator';
import Spinner from '../../../components/Spinner/Spinner';
import NoProductFound from '../../../components/NoProductFound/NoProductFound';

import * as shopActions from '../../../store/actions/index';




 class ShopIndex extends Component {

    _isMounted = false;

    state = {
        productPriceRequested : this.props.location.state ? this.props.location.state.currentPriceRequested : {min: 1, max: 99998},
        priceMin: 0,
        priceMax: 99999, 
        sortBy: this.props.location.state ? this.props.location.state.currentSort : 'latest',
        totalProducts: 0,
        currentPage: 1,
        loading: false,
        mountedOnce: false,
        componentName: 'shop',
        memoryCurrentPage: '',
    }



    componentDidMount(){
        window.scrollTo(0, 0);
    /*    this._isMounted = true;

        this.setState({ 
            mountedOnce: true,
            }, () => {
            console.log('shop mount state', this.state.productPriceRequested)
            this.loadProductsHandler();
        }) */

        this.setState({
            mountedOnce: true
        }, () => {this.props.loadProductsHandler()} )    
    }

    componentWillUpdate(){
        let scroll;
        if(window.innerWidth < 1199){
            scroll = 0
        } else {
            scroll = window.innerHeight - 80
        }
        window.scrollTo(0, scroll);
    }


    componentWillUnmount(){
        this._isMounted = false;
    }
 

  /*  loadProductsHandler = direction => {

        let currentPage = this.state.currentPage;

        this.setState({loading: true})

        if(direction){
            this.setState( {products: []} )
        }    

        if(direction === 'next'){
            currentPage++;
            this.setState({currentPage: currentPage})
        }

        if(direction === 'previous'){
            currentPage--;
            this.setState({currentPage: currentPage})
        }

         if(this.props.location.state && this.state.memoryCurrentPage !==  this.props.location.state.currentPage ){
                 currentPage = this.props.location.state.currentPage;
                 this.setState({memoryCurrentPage: this.props.location.state.currentPage})
         }        

            fetch('https://strix-market-place.herokuapp.com/' + 
                        this.state.productPriceRequested.min + '&&' + this.state.productPriceRequested.max +
                     '/' + this.state.sortBy +
                     '?page=' + currentPage) 
            .then(res => {
                if(res.status !== 200){
                    throw new Error('Failed to fectch products')
                }

                return res.json(); //extract the body
            })
            .then(resData => {

                let min, max

                if(this.props.location.state){
                    min = this.props.location.state.currentPriceRequested.min;
                    max= this.props.location.state.currentPriceRequested.max;
                } else {
                    min = resData.priceMin;
                    max = resData.priceMax;
                }

                if(this.props.location){
                    console.log('after fetch',this.props.location.state)
                }

                if(this._isMounted === true && this.state.mountedOnce === true ) {
                    this.setState( prevstate => ({
                        ...prevstate,
                        products: resData.products,
                        totalProducts: resData.totalProducts,
                        loading: false,
                        mountedOnce: false,
                        priceMin: resData.priceMin,
                        priceMax: resData.priceMax,
                        currentPage: currentPage,  
                        productPriceRequested: {
                            ...prevstate.productPriceRequested,
                            min: min,
                            max: max
                        },
                        
                    }))

                    

                } else {
                    if(this._isMounted === true) {
                        this.setState({
                            products: resData.products,
                            totalProducts: resData.totalProducts,
                            loading: false, 
                           
                        })
                     }
                }

                

             

                return null;
                
            })
            .catch( err => {
                if(err){
                    console.log(err);
                    this.setState({loading: false})
                }
               
            })
    }*/


    inputRangeChangeHandler = (value) => {
        this.props.inputRangeChangeHandler(value);
    }

    onChangeComplete = (value) => { 
        let history = this.state.mountedOnce;
        this.props.loadProductsHandler(value, history);
    
    }

    sortbyhandler = event => {
        event.preventDefault();
        this.setState({sortBy : event.target.value, currentPage: 1}, 
            () => this.loadProductsHandler())
    }

    render() {  
        
        let products;
         
        products = (
            this.props.products.map( product => {
                let fulldate =  new Date(product.createdAt).toLocaleString();
                return (
                    <Product
                            shop
                            currentPage = {this.state.currentPage}
                            currentPriceRequested={this.state.productPriceRequested}
                            currentSort = {this.state.sortBy}
                            componentToGoBack = {this.state.componentName}

                            key={product._id}
                            id={product._id}
                            title={product.title}
                            price={product.price}
                            category = {product.category}
                            description={product.description}
                            date = {fulldate}
                            imageUrl = {'https://strix-market-place.herokuapp.com/' + product.imageUrl }
                        />     
                )
            })
        )
     

       /* products = (

            this.props.products.map( product => {
                let fulldate =  new Date(product.createdAt).toLocaleString()
                return (          
                        <Product
                            shop
                            currentPage = {this.state.currentPage}
                            currentPriceRequested={this.state.productPriceRequested}
                            currentSort = {this.state.sortBy}
                            componentToGoBack = {this.state.componentName}


                            key={product._id}
                            id={product._id}
                            title={product.title}
                            price={product.price}
                            category = {product.category}
                            description={product.description}
                            date = {fulldate}
                            imageUrl = {'https://strix-market-place.herokuapp.com/' + product.imageUrl }
                        />                        
                    ) 
            })
            
        )*/

      /*  if(this.state.loading === true){
            products = <Spinner />
        } else {
            if(this.state.totalProducts < 1) {
                products = <NoProductFound />
            }   else {
                products = (
                    <Paginator onRequestPreviousPage={this.loadProductsHandler.bind(this, 'previous')}
                                                    onRequestNextPage={this.loadProductsHandler.bind(this, 'next')}
                                                    lastPage={Math.ceil(this.state.totalProducts / 10)}
                                                    currentPage={this.state.currentPage}>               
                                {
                                    this.state.products.map(product => {
                                        let fulldate =  new Date(product.createdAt).toLocaleString()
                                            return (          
                                                    <Product
                                                        shop
                                                        currentPage = {this.state.currentPage}
                                                        currentPriceRequested={this.state.productPriceRequested}
                                                        currentSort = {this.state.sortBy}
                                                        componentToGoBack = {this.state.componentName}


                                                        key={product._id}
                                                        id={product._id}
                                                        title={product.title}
                                                        price={product.price}
                                                        category = {product.category}
                                                        description={product.description}
                                                        date = {fulldate}
                                                        imageUrl = {'https://strix-market-place.herokuapp.com/' + product.imageUrl }
                                                    />                        
                                        )                                                      
                                    })}  
                            </Paginator> 
                )
            }
        } */
        
      
        return (
            
                <ShopLayout 
                    minPriceAllowed = {this.props.priceMin}
                    maxPriceAllowed = {this.props.priceMax}
                    inputRangeValue={this.props.inputRangeValue} /*Input Range value*/



                    inputRangeChangeHandler={this.inputRangeChangeHandler}
                    onChangeComplete = {this.onChangeComplete}


                   // minPrice = {this.state.productPriceRequested.min}
                  //  maxPrice ={this.state.productPriceRequested.max}
                   
                    sortbyhandler = {this.sortbyhandler}
                    sortBy={this.state.sortBy}>
                        
                    

                    <section className="shop__intro" style={{
                                    backgroundImage: `url('${bg}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                            }} >
                    
                    </section>              
                    <section className="shop--index"> 
                           {products}                         
                    </section>
                    </ShopLayout>
        
        
        )}
}

const mapStateToProps = state => {
    return {
        products: state.products,
        priceMin: state.priceMin,
        priceMax: state.priceMax, 
        inputRangeValue: state.inputRangeValue
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProductsHandler: (value, history) => dispatch(shopActions.loadProductsHandler(value, history)),
        inputRangeChangeHandler: (value) => dispatch(shopActions.inputRangeChangeHandler(value))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopIndex)
