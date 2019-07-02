import React, { Component } from 'react'
import './AdminProducts.css';
import Product from '../../../components/Product/Product';



 class AdminProducts extends Component {

    state = {
        products: [],
        status: ''
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

    render() {
        return (
            <section className="admin-products">
                {this.state.products.map( product => (
                    <Product
                        key={product._id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        link='/'
                />
            ))}
                
            </section>
        )
    }
}


export default AdminProducts;