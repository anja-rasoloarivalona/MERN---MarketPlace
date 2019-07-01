import React, { Component } from 'react'
import './ShopIndex.css';
import Product from '../../components/Product/Product';



 class ShopIndex extends Component {

    state = {
        products: [],
        status: ''
    }

    componentDidMount(){
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
            <section className="shop">
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


export default ShopIndex
