import React, { Component } from 'react'
import './Cart.css';
import Product from '../../components/Product/Product';
import { connect } from 'react-redux';

class Cart extends Component {

    componentDidMount(){
        window.scrollTo(0, 0);
    }
    
    render() {
        return (
            <div className='cart'>
                {this.props.products.map(product => (
                    <Product 
                        shop
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        category={product.category}
                        description={product.description}
                        imageUrl= {product.image}
                    />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.cart.products
    }
}
export default connect(mapStateToProps)(Cart);
