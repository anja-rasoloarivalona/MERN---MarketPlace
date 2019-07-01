import React, { Component } from 'react'
import './ShopIndex.css';
import Product from '../../components/Product/Product';



 class ShopIndex extends Component {

    render() {
        return (
            <section className="shop">
                <Product
                    title="1st product"
                    price='20'
                    description='This is the firest product'
                />
            </section>
        )
    }
}


export default ShopIndex
