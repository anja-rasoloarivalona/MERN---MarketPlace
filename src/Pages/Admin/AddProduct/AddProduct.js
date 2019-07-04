import React, { Component } from 'react';
import './AddProduct.css';

import Button from '../../../components/Button/Button';
import Input from '../../../components/FormInput/FormInput';
import FilePicker from '../../../components/FormInput/FilePicker/FilePicker';
import { generateBase64FromImage } from '../../../util/image';

const POST_PRODUCT = {
    title: {
        value: ''
    },

    price: {
        value: ''
    },

    image: {
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
        productBeingEdited : this.props.productBeingEdited,
        imagePreview: null
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
                image: {   
                    value: this.state.productBeingEdited.imagePath,
                   
                  },
                description: {
                    value: this.state.productBeingEdited.description
                }
            }
            this.setState({postProduct: postProduct})
        }
    }

    postProductChangeHandler = (input, value, files) => {
        if(files){
            generateBase64FromImage(files[0])
            .then(b64 => {
                this.setState({ imagePreview: b64})
            })
            .catch(err => {
                this.setState({imagePreview: null})
            })
        }
        this.setState(prevState =>{
            const updatedProduct = {
                ...prevState.postProduct,
                [input] : {
                    ...prevState.postProduct[input],
                    value: files ? files[0] : value
                }
            }
            return {
                postProduct: updatedProduct
            }           
        })
    }

    

    submitFormHandler = (e) => {
     //   e.preventDefault();
        const product = {
            title: this.state.postProduct.title.value,
            price: this.state.postProduct.price.value,
            description: this.state.postProduct.description.value,
            image: this.state.postProduct.image.value,
        }
        this.props.confirmSubmitHandler(product)
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
                    <FilePicker
                            id="image"
                            label="Image"
                            control="input"
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
