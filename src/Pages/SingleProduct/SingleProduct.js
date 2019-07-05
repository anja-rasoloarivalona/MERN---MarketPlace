import React, { Component } from 'react';
import './SingleProduct.css';




class SingleProduct extends Component {
    state = {
        title: '',
        description: '',
        category:'',
        price: '',
        image: ''
    }

    componentDidMount(){
        console.log(this.props.match.params);

        const prodId = this.props.match.params.prodId;
        const category = this.props.match.params.category;

        fetch('http://localhost:8000/'+ category + '/' + prodId, {
            method: 'GET'
        })
        .then( res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch product')
            }

            return res.json()
        })
        .then(resData => {
            this.setState({
                title: resData.product.title,
                price: resData.product.price,
                category: resData.product.category,
                image: 'http://localhost:8000' + resData.product.imageUrl,
                description: resData.product.description

            })
        })
        .catch( err => {
            console.log(err)
        })
    }

    render() {
        return (
            <section className="single-product">
                <h1>{this.state.title}</h1>
                <h1>{this.state.price}</h1>
                <h1>{this.state.title}</h1>
            </section>
        )
    }
}

export default SingleProduct;
