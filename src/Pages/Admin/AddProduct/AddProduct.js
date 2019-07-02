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
        postProduct : POST_PRODUCT,
        editingMode : this.props.editingMode,
        productBeingEdited : this.props.productBeingEdited
    }

    componentWillMount(){
        console.log('Mounted')
        if(this.props.editingMode){
            const postProduct = {
                title: {
                    value: this.state.productBeingEdited.title
                },
                price: {
                    value: this.state.productBeingEdited.price
                },
                description: {
                    value: this.state.productBeingEdited.description
                }
            }
            this.setState({postProduct: postProduct})
        }
    }

    postProductChangeHandler = (input, value) => {
        this.setState(prevState =>{
            const updatedProduct = {
                ...prevState.postProduct,
                [input] : {
                    ...prevState.postProduct[input],
                    value: value
                }
            }
            return {
                postProduct: updatedProduct
            }           
        })
    }

    confirmSubmitHandler = productData => {
        let url = 'http://localhost:8000/admin/add-product';
        let method = 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: productData.title,
                price: productData.price,
                description: productData.description

            })
        })
        .then(res => {
            if(res.status !== 200 && res.status !==201){
                throw new Error('Creating a post failed')
            }

            return res.json();
        })

        .catch(err => {
            console.log(err);
        })
    }

    submitFormHandler = () => {
        const product = {
            title: this.state.postProduct.title.value,
            price: this.state.postProduct.price.value,
            description: this.state.postProduct.description.value
        }
        this.confirmSubmitHandler(product)
        this.setState({
            postProduct: POST_PRODUCT //-----reset form----------
        }) 
    }


    render() {
        return (
                <form className='addProduct__form'
                      onSubmit={this.submitFormHandler}>
                    <Input 
                        id='title'
                        label='title'
                        type='text'
                        control='input' //to make sure that it's an input field
                        required={true}
                        value={this.state.postProduct['title'].value}
                        onChange={this.postProductChangeHandler}
                    />
                    <Input 
                        id='price'
                        label='price'
                        type='number'
                        control='input' 
                        required={true}
                        value={this.state.postProduct['price'].value}
                        onChange={this.postProductChangeHandler}
                    />
                    <Input 
                        id='description'
                        label='description'
                        type='text'
                        control='textarea' 
                        required={true}
                        value={this.state.postProduct['description'].value}
                        onChange={this.postProductChangeHandler}
                    />

                    <Button color='primary' type='submit'>
                        { this.state.editingMode ? 'Update' : 'Create'}
                    </Button>
                </form>
        )
    }
}

export default AddProduct
