import React, { Component, Fragment } from 'react'
import './AdminProducts.css';

/*-----COMPONENTS---------*/
import Product from '../../../components/Product/Product';
import Button from '../../../components/Button/Button';
import Backdrop from '../../../components/Backdrop/Backdrop';
import AddProduct from '../AddProduct/AddProduct';

import ErrorHandler from '../../../components/ErrorHandler/ErrorHandler';




 class AdminProducts extends Component {

    _isMounted = false;

    state = {
        products: [],
        status: '',
        showBackdrop: false,
        isEditing: false,
        productBeingEdited: '',
        error: null
 
    }

    componentDidMount(){
        this._isMounted = true;
        this.loadProductsHandler();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    loadProductsHandler = () => {
        if(this._isMounted === true){

            const token = localStorage.getItem('token');

            fetch('http://localhost:8000/admin/products',
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
                 .then(res => {
                     if(res.status !== 200){
                         throw new Error('Failed to fectch products')
                     }
                     return res.json(); //extract the body
                 })
                 .then(resData => {
                     this.setState({
                         products: resData.products.map(product => {
                             return {
                                 ...product,
                                 imagePath: product.imageUrl
                             }
                         })
                        
                     })
                 })
                 .catch( err => {
                     console.log(err)
             })
        }
        
    }

    backdropClickHandler = () => {
        this.setState({ showBackdrop: false, isEditing: false});
        console.log('clicked')
      };

    addProductHandler = (e) => {
        e.preventDefault();
        this.setState({
            showBackdrop: true
        })
    }

    startEditProductHandler = prodId => {
        this.setState(prevState => {
        const loadedProduct = {...prevState.products.find( p => p._id === prodId)}
         
            return {
                isEditing: true,
                productBeingEdited: loadedProduct,
                showBackdrop: true
            }
        })
    }

    confirmSubmitHandler = productData => {
        const token = localStorage.getItem('token');
        
            const formData = new FormData();
            formData.append('title', productData.title);
            formData.append('price', productData.price);
            formData.append('category', productData.category);
            formData.append('description', productData.description);
            formData.append('image', productData.image);
        let url = 'http://localhost:8000/admin/add-product';
        let method = 'POST';
    
        if(this.state.isEditing){
            url = 'http://localhost:8000/admin/product/' + this.state.productBeingEdited._id
            method = 'PUT'
        }

        fetch(url, {        
            headers: {
                Authorization: 'Bearer ' + token
            },
            method: method,
            body: formData
        })
        .then(res => {
            if(res.status !== 200 && res.status !==201){
                throw new Error('Creating a post failed')
            }

            return res.json();
        })
        .then(resProductData => {
            const product = {
                _id: resProductData.product._id,
                title: resProductData.product.title,
                price: resProductData.product.price,
                category: resProductData.product.category,
                description: resProductData.product.description,

                createdAt: resProductData.product.createdAt
            };

            console.log('from resProductData',product)

            this.setState(prevState => {
                let updatedProducts = [...prevState.products];
                if(prevState.productBeingEdited){
                    const prodIndex = updatedProducts.findIndex(p => p._id === prevState.productBeingEdited._id )
                    updatedProducts[prodIndex] = product;
                    
                } else if(prevState.products.length < 2) {
                    updatedProducts = prevState.products.concat(product)
                }

                return {
                    products: updatedProducts,
                    productBeingEdited: null,
                    isEditing: false,
                    showBackdrop: false
                }        
            })
        })

        .catch(err => {
            let error = []
            error.push(err.message)
            this.setState({
                isAuth: false,
                error: error
            })
        })
    }



    deleteProductHandler = productId => {
        const token = localStorage.getItem('token');

            fetch('http://localhost:8000/admin/product/' + productId, {
                headers: {
                    Authorization: 'Bearer ' + token
                },
                method: 'DELETE',
            })
                .then(res => {
                    if(res.status !== 200 && res.status !==201){
                        throw new Error('Failed Deleting product')
                    }
                    return res.json();
                })
                .then(resData => {
                    this.setState(prevState => {
                        const updatedProducts = prevState.products.filter(p => p._id !== productId);
                        return { products: updatedProducts};
                    })
               
                })
    }

    closeErrorHandler = () => {
        this.setState({ error: null})
    }

    
    render() {
        return (
            <Fragment>

            <ErrorHandler error = {this.state.error}
                          onCloseError={this.closeErrorHandler}/> 

            {this.state.showBackdrop && (
                <Fragment>
                    <Backdrop onClick={this.backdropClickHandler} />
                    <AddProduct 
                        editingMode={this.state.isEditing}
                        confirmSubmitHandler = {this.confirmSubmitHandler}
                        productBeingEdited={this.state.productBeingEdited}
                    />
                </Fragment>
                
              )}
                <section className="admin-products">

                        {this.state.products.map( product => (
                            <Product
                                key={product._id}
                                id={product._id}
                                title={product.title}
                                price={product.price}
                                description={product.description}
                                link='/'
                                onDelete={this.deleteProductHandler.bind(this, product._id)}
                                onStartEdit = {this.startEditProductHandler.bind(this, product._id)}
                                imageUrl = {'http://localhost:8000/' + product.imageUrl }
                        />
                        ))}

                        

                    <div className="admin-add-products">
                            <Button 
                            color='primary' 
                            onClick={this.addProductHandler}
                            >
                                Add Product
                            </Button>
                    </div>
                    
                </section>
            </Fragment>
        )
    }
}


export default AdminProducts;