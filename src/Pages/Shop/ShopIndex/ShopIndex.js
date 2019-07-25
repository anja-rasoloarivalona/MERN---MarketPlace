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

    onChangePriceRangeRequested = (value) => {
        this.props.priceRangeRequestedHandler(value);
    }

    onChangeCompletePriceRangeRequested = (value) => { 
        let history = this.state.mountedOnce;
        this.props.loadProductsHandler(value, history);
    
    }

    sortbyhandler = e => {
        e.preventDefault();
        let sortBy = e.target.value;
        this.props.sortByhandler(this.props.inputRangeValue, this.state.mountedOnce, sortBy);
    }

    paginationHandler = direction => {
        this.props.paginationHandler(
            this.props.inputRangeValue, 
            this.state.mountedOnce,
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
                                    //       currentPage = {this.state.currentPage}
                                    //      currentPriceRequested={this.state.productPriceRequested}
                                    //     currentSort = {this.state.sortBy}
                                    //     componentToGoBack = {this.state.componentName}

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
        priceMax: state.priceMax, 
        inputRangeValue: state.inputRangeValue,
        sortBy: state.sortBy,
        currentPage: state.currentPage,
        totalProducts: state.totalProducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        priceRangeRequestedHandler: (val) => dispatch(shopActions.priceRangeRequestedHandler(val)),
        loadProductsHandler: (val, history) => dispatch(shopActions.loadProductsHandler(val, history)),
        sortByhandler: (val, history, sortBy) => dispatch(shopActions.sortByHandler(val, history, sortBy)),
        paginationHandler: (val, history, sortBy, currentPage, direction) => dispatch(shopActions.paginationHandler(val, history, sortBy, currentPage,direction))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopIndex)
