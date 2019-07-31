import React, { Component } from 'react';
import './FormUserInfo.css';
import Input from '../../../components/FormInput/FormInput';
import Button from '../../../components/Button/Button';

class FormUserInfo extends Component {
    render() {
        return (

            <section className="checkout__newAddress">
                    <div className="checkout__newAddress__title">Add a new address</div>
                    <form className="form__userInfo flex-centered-column">
                        <Input 
                            id="full name"
                            label="full name :"
                            type="text"
                            control="input"
                            required={true}
                        />

                        <Input 
                            id="address line 1"
                            label="address line 1 :"
                            type="text"
                            control="input"
                            required={true}
                        />

                        <Input 
                            id="address line 2"
                            label="address line 2 :"
                            type="text"
                            control="input"
                            required={true}
                        />

                        <Input 
                            id="city"
                            label="city :"
                            type="text"
                            control="input"
                            required={true}
                        />

                        <Input 
                            id="state"
                            label="state/province/region :"
                            type="text"
                            control="input"
                            required={true}
                        />

                        <Input 
                            id="zip"
                            label="zip :"
                            type="text"
                            control="input"
                            required={true}
                        />

                        <Input 
                            id="email"
                            label="email :"
                            type="email"
                            control="input"
                            required={true}
                        />

                        <Input 
                            id="phone Number"
                            label="phone Number :"
                            type="text"
                            control="input"
                            required={true}
                        />

                        <Button onClick={this.props.onValidate.bind(this, 'delivery')}
                                color="primary">
                            Next
                        </Button>
                    </form>
                
            </section>
            
        )
    }
}

export default FormUserInfo;
