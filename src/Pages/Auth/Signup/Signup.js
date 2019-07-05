import React, { Component} from 'react';
import Input from '../../../components/FormInput/FormInput';
import './Signup.css';
import Auth from '../Auth';
import '../Auth.css';
import Button from '../../../components/Button/Button';

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
            <form onSubmit={e => this.signupHandler(e, this.state)}
                  className="auth__form flex-centered-column">
                <dv>Create an account</dv>
                <Input 
                    id='name'
                    label='name*'
                    type='text'
                    control='input' //to make sure that it's an input field
                    required={true}
                    value={this.state.signupForm['name'].value}
                    onChange={this.signupFormChangeHandler}
                />
                <Input 
                    id='email'
                    label='email*'
                    type='email'
                    control='input' //to make sure that it's an input field
                    required={true}
                    value={this.state.signupForm['email'].value}
                    onChange={this.signupFormChangeHandler}
                />
                <Input 
                    id='password'
                    label='password*'
                    type='password'
                    control='input' 
                    required={true}
                    value={this.state.signupForm['password'].value}
                    onChange={this.signupFormChangeHandler}
                />
                <Input 
                    id='confirm_password'
                    label='confirm password*'
                    type='password'
                    control='input' 
                    required={true}
                    value={this.state.signupForm['confirm_password'].value}
                    onChange={this.signupFormChangeHandler}
                />
                    <div>
                        <div>Already a member?</div>
                        <div>Forget password</div>
                    </div>
                <Button type="submit">
                    Sign Up
                </Button>
            </form>
        </Auth>     
            
        )
    }
}               

export default Signup;
