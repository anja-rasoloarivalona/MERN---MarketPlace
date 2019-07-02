import React, { Component, Fragment } from 'react'
import './AdminProducts.css';

/*-----COMPONENTS---------*/
import Product from '../../../components/Product/Product';
import Button from '../../../components/Button/Button';
import Backdrop from '../../../components/Backdrop/Backdrop';
import AddProduct from '../AddProduct/AddProduct';


 class AdminProducts extends Component {

    state = {
        products: [],
        status: '',
        showBackdrop: false,
        isEditing: false,
        productBeingEdited: ''
    }

    componentDidMount(){
        this.loadProductsHandler();
    }

    componentDidUpdate(){
        this.loadProductsHandler();
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
                this.setState({
                    products: resData.products,
                })
            })
            .catch( err => {
                console.log(err)
            })
    }

    backdropClickHandler = () => {
        this.setState({ showBackdrop: false});
        console.log('clicked')
      };

    addProductHandler = (e) => {
        e.preventDefault();
        this.setState({
            showBackdrop: true
        })
    }

    startEditProductHandler = postId => {
        this.setState(prevState => {
            const loadedProduct = {...prevState.posts.find( p => p.id === postId)}

            return {
                isEditing: true,
                productBeingEdited: loadedProduct
            }
        })
    }



    deleteProductHandler = productId => {
            fetch('http://localhost:8000')
                .then(res => {
                    if(res.status !== 200 && res.status !==201){
                        throw new Error('Failed Deleting product')
                    }

                    return res.json();
                })
                .then(resData => {
                    this.setState(prevState => {
                        const updatedProducts = prevState.products.filter(p => p.id !== productId);
                        return { products: updatedProducts};
                    })
               
                })
    }

    render() {
        return (
            <Fragment>
            {this.state.showBackdrop && (
                <Fragment>
                    <Backdrop onClick={this.backdropClickHandler} />
                    <AddProduct />
                </Fragment>
                
              )}
                <section className="admin-products">
                        {this.state.products.map( product => (
                            <Product
                                key={product._id}
                                title={product.title}
                                price={product.price}
                                description={product.description}
                                link='/'
                                onDelete={this.deleteProductHandler.bind(this, product._id)}
                                onStartEdit = {this.startEditProductHandler.bind(this, product._id)}
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