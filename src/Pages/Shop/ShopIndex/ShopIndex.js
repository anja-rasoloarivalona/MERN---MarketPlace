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
        mountedOnce: false,
    }

    


    componentDidMount(){

       

        window.scrollTo(0, 0);

        let cat = this.props.match.params.category;

        let inputRangeValue = this.props.inputRangeValue;

        const initialInputRangeValue = {
            min: this.props.initialPriceMin,
            max: this.props.initialPriceMax
        }

        console.log('did mount', this.props.inputRangeValue)

        this.setState({
            mountedOnce: true
            }, () => { /*--- 3 scenarios as callback on componentDidMount ---*/

                        

                        /* CASE 1: If user request the products by category */
                        {if(cat){
                            let history; 
                            let currentPage = 1;
                            let val; 
                            if(this.props.priceMin !== this.props.inputRangeValue.min || this.props.priceMax !== this.props.inputRangeValue.max){
                                console.log('no reset, keep old values')
                                console.log('priceMin: ', this.props.priceMin);
                                console.log('priceMax: ', this.props.priceMax)
                                history = true;
                                val = this.props.inputRangeValue //keep the new inputRangeValue
                            } else {
                                val = {min: 1, max: 99998} //reset the inputRangeValue
                                history = false; //loadProductsHandler will reset everything without history
                            }  
                            return this.props.categoryHandler(val, history, cat, this.props.sortBy, currentPage);

                        } else {
                        
                        /* CASE 2: Load Shop Index by keeping the old inputRangeValue (example: shop - change value - login - back to shop - keep new */
                          if(JSON.stringify(inputRangeValue) != JSON.stringify(initialInputRangeValue)) {
                                return  /*it will be triggered by clicking the link in order to reach this page*/
                          } else {

                        /* CASE 3: Load Shop Index by Default*/
                                console.log('default')
                                return this.props.loadProductsHandler(
                                    null,
                                    false,
                                    '',
                                    this.props.sortBy,
                                    this.props.currentPage
                                )
                          }                
                       }                    
                    }    
                })
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

    onChangePriceRangeRequested = (value) => {
        /*Update the state*/
        this.props.priceRangeRequestedHandler(value);
    }

    onChangeCompletePriceRangeRequested = (value) => { 
        /*Fetch the products after updating state*/
        let history = this.state.mountedOnce;
        let category = this.props.category;
        let sortBy = this.props.sortBy;
        if(category){
            return   this.props.loadProductsHandler(value, history, category, sortBy);
        } else {
            this.props.loadProductsHandler(value, history, '', sortBy);
        }      
    }

    sortbyhandler = e => {
        e.preventDefault();
        let sortBy = e.target.value;
        this.props.sortByhandler(
            this.props.inputRangeValue, 
            this.state.mountedOnce, 
            this.props.category,
            sortBy);
    }

    paginationHandler = direction => {
        this.props.paginationHandler(
            this.props.inputRangeValue, 
            this.state.mountedOnce,
            this.props.category,
            this.props.sortBy,
            this.props.currentPage,
            direction)
    }

    render() {  
        
        let products;

        if(this.props.loading){
            products = <Spinner />
        } else {
            products = (
                <Paginator  onRequestPreviousPage={this.paginationHandler.bind(this, 'previous')}
                            onRequestNextPage={this.paginationHandler.bind(this, 'next')}
                            lastPage={Math.ceil(this.props.totalProducts / 10)}
                            currentPage={this.props.currentPage}>
                            {this.props.products.map( product => {
                                let fulldate =  new Date(product.createdAt).toLocaleString();
                                return ( 
                                        <Product
                                                shop
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
                            }) }
                </Paginator>   
            ) 
        }
         
           
      
        return (           
                <ShopLayout 
                    minPriceAllowed = {this.props.priceMin}
                    maxPriceAllowed = {this.props.priceMax}
                    priceRangeRequested = {this.props.inputRangeValue}
                    onChangePriceRangeRequested={this.onChangePriceRangeRequested}
                    onChangeCompletePriceRangeRequested= {this.onChangeCompletePriceRangeRequested}  
                    sortbyhandler = {this.sortbyhandler}
                    sortBy={this.props.sortBy}>
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
        products: state.products.products,
        priceMin: state.products.priceMin,
        initialPriceMin: state.products.initialPriceMin,
        priceMax: state.products.priceMax, 
        initialPriceMax: state.products.initialPriceMax,
        inputRangeValue: state.products.inputRangeValue,
        sortBy: state.products.sortBy,
        currentPage: state.products.currentPage,
        totalProducts: state.products.totalProducts,
        category: state.products.category,
        loading: state.products.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        priceRangeRequestedHandler: (val) => dispatch(shopActions.priceRangeRequestedHandler(val)),
        loadProductsHandler: (val, history, category, sortBy, page) => dispatch(shopActions.loadProductsHandler(val, history, category, sortBy, page)),
        sortByhandler: (val, history, category, sortBy) => dispatch(shopActions.sortByHandler(val, history, category, sortBy)),
        paginationHandler: (val, history, category, sortBy, currentPage, direction) => dispatch(shopActions.paginationHandler(val, history, category, sortBy, currentPage,direction)),
        categoryHandler: (val, history, category, sortBy) => dispatch(shopActions.categoryHandler(val, history, category, sortBy))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopIndex)
