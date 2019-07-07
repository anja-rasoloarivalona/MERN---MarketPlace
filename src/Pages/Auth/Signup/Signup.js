import React, { Component} from 'react';
import Input from '../../../components/FormInput/FormInput';
import './Signup.css';
import Auth from '../Auth';
import '../Auth.css';
import Button from '../../../components/Button/Button';
import { required, length, email } from '../../../util/validators';

class Signup extends Component {

 

    state = {
        signupForm : {

            name: {
                value: '',
                valid: false,
                validators: [required, length({min: 3})]
            },
            email: {
                value: '',
                valid: false,
                validators: [required, email]
            },

            password: {
                value: '',
                valid: false,
                validators: [required, length({min: 5})]

            },

            confirm_password: {
                value: '',  
                valid: false,    
                validators: [required]        
            },
        },

        formIsValid: false
    }

    confirmHandler = value => {
        return value === this.state.signupForm.password.value;
    } 
    
    
 
    signupFormChangeHandler = (input, value) => { 
        this.setState(prevState => {
            let isValid = true;
            for (const validator of prevState.signupForm[input].validators) {
              isValid = isValid && validator(value);
            }
            const updatedForm = {
              ...prevState.signupForm,
              [input]: {
                ...prevState.signupForm[input],
                valid: isValid,
                value: value
              }
            };
            let formIsValid = true;
            for (const inputName in updatedForm) {
                   formIsValid = formIsValid && updatedForm[inputName].valid;
            }

            if(updatedForm.confirm_password.value === updatedForm.password.value) {
                return {
                    signupForm: updatedForm,
                    formIsValid: formIsValid
                  };
            } else {
               return {
                signupForm : updatedForm,
                formIsValid: false
               } 
            }

           
          });
    }

    signupHandler = (e, signupFormData) => {
        e.preventDefault();
        console.log(this.state.formIsValid, this.state.signupForm)
    }

    render() {
        return (        
          <Auth>          
            <form onSubmit={e => this.signupHandler(e, this.state)}
                  className="auth__form flex-centered-column">
                <div>Create an account</div>
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
