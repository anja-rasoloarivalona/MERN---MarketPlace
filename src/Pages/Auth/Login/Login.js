import React, { Component} from 'react';
import Input from '../../../components/FormInput/FormInput';
import './Login.css';
import Auth from '../Auth';
import Button from '../../../components/Button/Button';
import '../Auth.css';

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

    inputChangeHandler = () => {
        console.log('changed')
    }

    render() {
        return (        
            <Auth>
                <form className="auth__form flex-centered-column"
                    onSubmit={ e => this.loginHandler(e, {
                    email: this.state.loginForm.email.value,
                    password: this.state.loginForm.password.value
                })}>    
                        <div>Log In</div>
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
                            value={this.state.loginForm['password'].value}
                            valid={this.state.loginForm['password'].valid}
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
