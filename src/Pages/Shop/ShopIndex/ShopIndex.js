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

        this.setState({
            mountedOnce: true
            }, () => { /*--- 3 scenarios as callback on componentDidMount ---*/

                        /* CASE 1: If user request the products by category */
                        {if(cat){
                            let val = {min: 1, max: 99998}; //reset the inputRangeValue
                            let history = null; //loadProductsHandler will reset everything without history
    
                            return this.props.categoryHandler(val, history, cat, this.props.sortBy)
                        } else {
                        
                        /* CASE 2: Load Shop Index by keeping the old inputRangeValue (example: shop - change value - login - back to shop - keep new */
                          if(JSON.stringify(inputRangeValue) != JSON.stringify(initialInputRangeValue)) {

                            console.log('input', inputRangeValue)
                            console.log('initial input',initialInputRangeValue )

                                console.log('shop index dit mount and keep old values')
                                return //this.props.loadProductsHandler(inputRangeValue)
                          } else {

                        /* CASE 3: Load Shop Index by Default*/
                                console.log('shop index dit mount and reset')
                                return this.props.loadProductsHandler()
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
        this.props.priceRangeRequestedHandler(value);
    }

    onChangeCompletePriceRangeRequested = (value) => { 
        let history = this.state.mountedOnce;
        let category = this.props.category;
        let sortBy = this.props.sortBy;
        console.log('change complete, sort by', sortBy)
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
            this.props.currentPage ,
            direction)
    }

    render() {  
        
        let products;
         
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
        products: state.products,
        priceMin: state.priceMin,
        initialPriceMin: state.initialPriceMin,
        priceMax: state.priceMax, 
        initialPriceMax: state.initialPriceMax,
        inputRangeValue: state.inputRangeValue,
        sortBy: state.sortBy,
        currentPage: state.currentPage,
        totalProducts: state.totalProducts,
        category: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        priceRangeRequestedHandler: (val) => dispatch(shopActions.priceRangeRequestedHandler(val)),
        loadProductsHandler: (val, history, category, sortBy) => dispatch(shopActions.loadProductsHandler(val, history, category, sortBy)),
        sortByhandler: (val, history, category, sortBy) => dispatch(shopActions.sortByHandler(val, history, category, sortBy)),
        paginationHandler: (val, history, category, sortBy, currentPage, direction) => dispatch(shopActions.paginationHandler(val, history, category, sortBy, currentPage,direction)),
        categoryHandler: (val, history, category, sortBy) => dispatch(shopActions.categoryHandler(val, history, category, sortBy))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopIndex)
