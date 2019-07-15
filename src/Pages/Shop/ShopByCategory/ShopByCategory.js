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
        productPriceRequested : this.props.location.state ? this.props.location.state.currentPriceRequested : {min: 1, max: 99998},
        priceMin: 0,
        priceMax: 99999, 
        category: this.props.match.params.category,
        sortBy: this.props.location.state ? this.props.location.state.currentSort : 'latest',
        totalProducts: 0,
        currentPage: 1,
        loading: false,
        mountedOnce: false,
        componentName: 'category',
        memory: ''
    }



    componentDidMount(){        
        this._isMounted = true;
        this.setState({ mountedOnce: true}, () => {
            this.loadProductsHandler();
        })
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
            let priceRequested = {...this.state.productPriceRequested}
            priceRequested.min = 1;
            priceRequested.max = 99998;
            this.setState({
                        mountedOnce: true,
                        category: nextProps.match.params.category, 
                        currentPage: 1,
                        priceMin: 0,
                        priceMax: 99999,
                        productPriceRequested: priceRequested}, () => {
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

        if(this.props.location.state && this.state.memory !==  this.props.location.state.currentPage ){
            currentPage = this.props.location.state.currentPage;
            this.setState({memory: this.props.location.state.currentPage})
        } 

            fetch('http://localhost:8000/' + 
                   this.state.category + '/' + 
                   this.state.productPriceRequested.min + '&&' + this.state.productPriceRequested.max + '/' +
                   this.state.sortBy +
                   '?page=' + currentPage
                   )
            .then(res => {
                if(res.status !== 200){
                    throw new Error('Failed to fectch products')
                }

                return res.json(); //extract the body
            })
            .then(resData => {

                let min, max

                if(this.props.location.state){
                    min = this.state.productPriceRequested.min;
                    max= this.state.productPriceRequested.max;
                } else {
                    min = resData.minPrice;
                    max = resData.maxPrice;
                }

                if(this._isMounted === true && this.state.mountedOnce === true) {
                    this.setState( prevstate => ({
                        ...prevstate,
                        products: resData.products,
                        totalProducts: resData.totalProducts,
                        loading: false,
                        mountedOnce: false,
                        priceMin: resData.minPrice,
                        priceMax: resData.maxPrice,
                        productPriceRequested: {
                            ...prevstate.productPriceRequested,
                            min: min,
                            max: max 
                        },
                        currentPage: currentPage
                    }))      
                    console.log('from props location',this.props.location.state.currentPage)
                    console.log('onMountedOnce',this.state.currentPage)
                } else {
                    if(this._isMounted === true){
                        this.setState({
                            products: resData.products,
                            totalProducts: resData.totalProducts,
                            loading: false,
                        })
                    } 

                    console.log('from props location dos',this.props.location.state.currentPage)
                     console.log('shop index, current page after fetch dos',this.state.currentPage)
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
        this.setState({productPriceRequested : value, currentPage: 1}, 
            () => this.loadProductsHandler())
    }

    sortbyhandler = event => {
        event.preventDefault();
        this.setState({sortBy : event.target.value, currentPage: 1}, 
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
                    sortBy={this.state.sortBy}
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
