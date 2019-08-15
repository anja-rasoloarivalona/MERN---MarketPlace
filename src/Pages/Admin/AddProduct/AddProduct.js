import React, { Component } from 'react';
import './AddProduct.css';

import Button from '../../../components/Button/Button';
import Input from '../../../components/FormInput/FormInput';
import FilePicker from '../../../components/FormInput/FilePicker/FilePicker';
import { generateBase64FromImage } from '../../../util/image';

import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';


const POST_PRODUCT = {
    title: {
        value: ''
    },

    price: {
        value: ''
    },

    category: {
        value: 'automobile'
    },

    image: {
        value: ''
    },

    description: {
        value: ''
    }
}

const message = defineMessages({
    title: {
        id: "title",
        defaultMessage: "Title"
    },

    price: {
        id: "price",
        defaultMessage: "Price"
    },

    category: {
        id: "category",
        defaultMessage: "Category"
    },

    image: {
        id: "image",
        defaultMessage: "Image"
    },

    description: {
        id: "description",
        defaultMessage: "Description"
    }
})


class AddProduct extends Component {
    state = {
        postProduct : POST_PRODUCT,
        editingMode : this.props.editingMode,
        productBeingEdited : this.props.productBeingEdited,
        file: undefined
    }
    

    componentWillMount(){     

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
                },
                category: {
                    value: this.state.productBeingEdited.category
                }

                
            }
            this.setState({postProduct: postProduct})
        }
    }

    postProductChangeHandler = (input, value, files) => {
        if(files){
         /*   generateBase64FromImage(files[0])
            .then(b64 => {
                this.setState({ imagePreview: b64})
            })
            .catch(err => {
                this.setState({imagePreview: null})
            })*/
            this.setState({ file : files[0].name});

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
            category: this.state.postProduct.category.value,
            description: this.state.postProduct.description.value,
            image: this.state.postProduct.image.value,
        }
        this.props.confirmSubmitHandler(product)
        this.setState({
            postProduct: POST_PRODUCT //-----reset form----------
        }) 
    }


    render() {


        const {formatMessage} = this.props.intl;

        return (
                <form className='addProduct__form'
                      onSubmit={this.submitFormHandler}>
                    <Input 
                        id='title'
                        label={formatMessage(message.title)}
                        type='text'
                        control='input' //to make sure that it's an input field
                        required={true}
                        value={this.state.postProduct['title'].value}
                        onChange={this.postProductChangeHandler}
                    />
                    <Input 
                        id='price'
                        label={formatMessage(message.price)}
                        type='number'
                        control='input' 
                        required={true}
                        value={this.state.postProduct['price'].value}
                        onChange={this.postProductChangeHandler}
                    />

                    <Input 
                        id='category'
                        label={formatMessage(message.category)}
                        type='text'
                        control='select' 
                        required={true}
                        value={this.state.postProduct['category'].value}
                        onChange={this.postProductChangeHandler}
                    />

                    <FilePicker
                            id="image"
                            label={formatMessage(message.image)}
                            control="input"
                            file={this.state.file}
                            onChange={this.postProductChangeHandler}
                            />

                    <Input 
                        id='description'
                        label={formatMessage(message.description)}
                        type='text'
                        control='textarea' 
                        required={true}
                        value={this.state.postProduct['description'].value}
                        onChange={this.postProductChangeHandler}
                    />

                    
                    <div>
                        <Button color='primary' type='submit'>
                            { this.state.editingMode ? <FormattedMessage id="update" defaultMessage="update"/> : <FormattedMessage id="create" defaultMessage="create"/>}
                        </Button>
                        <Button color="secondary" onClick={this.props.onCancel}>
                               <FormattedMessage id="cancel" defaultMessage="cancel"/>
                        </Button>
                    </div>
                    
                </form>
        )
    }
}

export default injectIntl(AddProduct) 
