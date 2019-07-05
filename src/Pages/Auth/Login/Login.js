import React, { Component} from 'react';
import Input from '../../../components/FormInput/FormInput';
import './Login.css';
import Auth from '../Auth';
import Button from '../../../components/Button/Button';

class Login extends Component {

    state = {
        loginForm: {
            email: {
                value: '',
                valid: false
            },
            password: {
                value: '',
                valid: false
            }

        }
    }

    loginHandler = (e, loginFormData) => {
        e.preventDefault();
        console.log('Login')
    }

    render() {
        return (        
            <Auth>
                <form onSubmit={ e => this.loginHandler(e, {
                    email: this.state.loginForm.email.value,
                    password: this.state.loginForm.password.value
                })}>
                        <Input 
                            id='email'
                            label='email'
                            type='email'
                            control='input' //to make sure that it's an input field
                            onChange={this.inputChangeHandler}
                            required={true}
                            value={this.state.loginForm['email'].value}
                            valid={this.state.loginForm['email'].valid}        
                        />
                        <Input 
                            id='password'
                            label='password'
                            type='password'
                            control='input' 
                            onChange={this.inputChangeHandler}
                            required={true}
                            value={this.state.postProduct['password'].value}
                            valid={this.state.postProduct['password'].valid}
                        />
                        <Button type="submit">
                            Login
                        </Button>
                </form>
            </Auth>    
            
        )
     }
}               

export default Login;
