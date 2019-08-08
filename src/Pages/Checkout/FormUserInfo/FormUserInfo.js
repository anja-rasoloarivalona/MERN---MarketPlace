import React, { Component } from 'react';
import './FormUserInfo.css';
import Input from '../../../components/FormInput/FormInput';
import Button from '../../../components/Button/Button';
import CountriesInput from './CountriesListInput/CountriesListInput'


const POST_USER_INFO = {
    fullname: {
        value: ''
    },
    address1: {
        value: ''
    },
    address2: {
        value: ''
    },
    city: {
        value: ''
    },
    state: {
        value: ''
    },
    zip: {
        value: ''
    },
    email: {
        value: ''
    },
    phoneNumber: {
        value: ''
    }
}


class FormUserInfo extends Component {

    state = {
        postUserInfo: POST_USER_INFO
    }

    sumbitFormHandler = () => {
        const userInfo = {
            fullname: this.state.postUserInfo.fullname.value,
            address1: this.state.postUserInfo.address1.value,
            address2: this.state.postUserInfo.address2.value,
            city: this.state.postUserInfo.city.value,
            state: this.state.postUserInfo.state.value,
            zip: this.state.postUserInfo.zip.value,
            email: this.state.postUserInfo.email.value,
            phoneNumber: this.state.postUserInfo.phoneNumber.value
        }

        const token = localStorage.getItem('token');

        const formUserData = new FormData();
        formUserData.append('fullname', userInfo.fullname);
        formUserData.append('address1', userInfo.address1);
        formUserData.append('address2', userInfo.address2);
        formUserData.append('city', userInfo.city);
        formUserData.append('state', userInfo.state);

        formUserData.append('zip', userInfo.zip);
        formUserData.append('email', userInfo.email);
        formUserData.append('phoneNumber', userInfo.phoneNumber);

       fetch('https://market-place-anja.firebaseapp.com/cart/add-userInfo/' , {
           headers: {
               Authorization: 'Bearer ' + token
           },
           method: 'POST',
           body: formUserData
       })
       .then(res => {
            if(res.status !== 200 && res.status !==201){
                throw new Error('Creating a post failed')
            }

            return res.json();
       })
       .then( resUserData => {
           const userData = {
               _id: resUserData.address._id,
               fullname: resUserData.address.fullname,
               address1: resUserData.address.address1,
               address2: resUserData.address.address2,
               city: resUserData.address.city,
               state: resUserData.address.state,
               zip: resUserData.address.zip,
               email: resUserData.address.email,
               phoneNumber: resUserData.address.phoneNumber
           }

           console.log(userData)
       })
       .catch( err => {
           console.log(err);
       })

    }

    postUserFormChangeHandler = (input, value) => {
        this.setState(prevState => {
           const updatedForm = {
               ...prevState.postUserInfo,
               [input] : {
                   ...prevState.postUserInfo[input],
                   value: value
               }
           }

           return {
               postUserInfo: updatedForm
           }
        })
    }


    render() {
        return (

            <section className="checkout__newAddress">
                    <div className="checkout__newAddress__title">Add a new address</div>
                    <form className="form__userInfo flex-centered-column" 
                          onSubmit={this.sumbitFormHandler}>
                        <Input 
                            id="fullname"
                            label="full name :"
                            type="text"
                            control="input"
                            required={true}
                            value={this.state.postUserInfo['fullname'].value}
                            onChange={this.postUserFormChangeHandler}
                        />

                        <Input 
                            id="address1"
                            label="address line 1 :"
                            type="text"
                            control="input"
                            required={true}
                            value={this.state.postUserInfo['address1'].value}
                            onChange={this.postUserFormChangeHandler}
                        />

                        <Input 
                            id="address2"
                            label="address line 2 :"
                            type="text"
                            control="input"
                            value={this.state.postUserInfo['address2'].value}
                            onChange={this.postUserFormChangeHandler}
                        />

                        <Input 
                            id="city"
                            label="city :"
                            type="text"
                            control="input"
                            required={true}
                            value={this.state.postUserInfo['city'].value}
                            onChange={this.postUserFormChangeHandler}
                        />

                        <CountriesInput 
                            id="state"
                            label="state/province/region :"
                            type="text"
                            control="input"
                            required={true}     
                            value={this.state.postUserInfo['state'].value} 
                            onChange={this.postUserFormChangeHandler}        
                        />

                        <Input 
                            id="zip"
                            label="zip :"
                            type="text"
                            control="input"
                            required={true}
                            value={this.state.postUserInfo['zip'].value}
                            onChange={this.postUserFormChangeHandler}
                        />

                        <Input 
                            id="email"
                            label="email :"
                            type="email"
                            control="input"
                            required={true}
                            value={this.state.postUserInfo['email'].value}
                            onChange={this.postUserFormChangeHandler}
                        />

                        <Input 
                            id="phoneNumber"
                            label="phone Number :"
                            type="text"
                            control="input"
                            required={true}
                            value={this.state.postUserInfo['phoneNumber'].value}
                            onChange={this.postUserFormChangeHandler}
                        />

                        <Button //onClick={this.props.onValidate.bind(this, 'delivery')}
                                color="primary"
                                type="submit">
                            Add
                        </Button>
                    </form>
                
            </section>
            
        )
    }
}

export default FormUserInfo;
