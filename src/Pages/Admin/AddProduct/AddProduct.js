import React, { Component } from 'react';
import './AddProduct.css';

import Button from '../../../components/Button/Button';
import Input from '../../../components/FormInput/FormInput';

const POST_PRODUCT = {
    title: {
        value: ''
    },

    price: {
        value: ''
    },

    description: {
        value: ''
    }
}
class AddProduct extends Component {
    state = {
        postProduct : POST_PRODUCT
    }
    render() {
        return (
            <section className='addProduct'>
                <form className='addProduct__form'
                      onSubmit={this.submitFormHandler}>
                    <Input 
                        id='title'
                        label='title'
                        type='text'
                        control='input' //to make sure that it's an input field
                        required='true'
                        value={this.state.postProduct['title'].value}
                        onChange={this.postProductChangeHandler}
                    />
                    <Input 
                        id='price'
                        label='price'
                        type='number'
                        control='input' 
                        required='true'
                        value={this.state.postProduct['price'].value}
                        onChange={this.postProductChangeHandler}
                    />
                    <Input 
                        id='description'
                        label='description'
                        type='text'
                        control='textarea' 
                        required='true'
                        value={this.state.postProduct['description'].value}
                        onChange={this.postProductChangeHandler}
                    />

                    <Button color='primary' type='submit'>

                    </Button>
                </form>
            </section>
        )
    }
}

export default AddProduct
