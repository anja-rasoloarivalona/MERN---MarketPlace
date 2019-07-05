import React, { Component} from 'react';
import Input from '../../../components/FormInput/FormInput';
import './Signup.css';
import Auth from '../Auth';

class Signup extends Component {

    state = {
        signupForm : {

            name: {
                value: '',
                valid: false
            },
            email: {
                value: '',
                valid: false
            },

            password: {
                value: '',
                valid: false
            },

            confirm_password: {
                value: '',
                valid: false
            }

        }
    }

    signupFormChangeHandler = () => {
        console.log('lol')
    }

    signupHandler = (e, signupFormData) => {
        e.preventDefault();
        console.log('sign up')
    }

    render() {
        return (        
          <Auth>          
            <form onSubmit={e => this.signupHandler(e, this.state)}>
                <Input 
                    id='name'
                    label='name'
                    type='text'
                    control='input' //to make sure that it's an input field
                    required={true}
                    value={this.state.signupForm['name'].value}
                    onChange={this.signupFormChangeHandler}
                />
                <Input 
                    id='email'
                    label='email'
                    type='email'
                    control='input' //to make sure that it's an input field
                    required={true}
                    value={this.state.signupForm['email'].value}
                    onChange={this.signupFormChangeHandler}
                />
                <Input 
                    id='password'
                    label='password'
                    type='password'
                    control='input' 
                    required={true}
                    value={this.state.signupForm['password'].value}
                    onChange={this.signupFormChangeHandler}
                />
                <Input 
                    id='confirm_password'
                    label='confirm password'
                    type='password'
                    control='input' 
                    required={true}
                    value={this.state.signupForm['confirm_password'].value}
                    onChange={this.signupFormChangeHandler}
                />
            </form>
        </Auth>     
            
        )
    }
}               

export default Signup;
