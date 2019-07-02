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
            <section className="shop">
                {
                    this.state.products.map(product => {
                        const date = product.createdAt.slice(0, 10);
                        return <Product
                                    shop
                                    key={product._id}
                                    id={product._id}
                                    title={product.title}
                                    price={product.price}
                                    description={product.description}
                                    date = {date}
                                    link='/'
                                    imageUrl = {'http://localhost:8000/' + product.imageUrl }
                                />
                    })
                }             
                
            </section>
        )
    }
}


export default ShopIndex
