import React, { Component, Fragment} from 'react';
import Input from '../../../components/FormInput/FormInput';
import './Signup.css';
import Auth from '../Auth';
import '../Auth.css';
import Button from '../../../components/Button/Button';
import ErrorHandler from '../../../components/ErrorHandler/ErrorHandler';
import { required, length, email } from '../../../util/validators';

class Signup extends Component {

 

    state = {
        signupForm : {

            name: {
                value: '',
                valid: false,
                validators: [length({min: 3})],
                errorLabel: 'A name',
                errorMessage: 'Please enter at least 3 characters in the name field'
            },
            email: {
                value: '',
                valid: false,
                validators: [email],
                errorLabel: 'An email',
                errorMessage: 'Please enter a valid email'

            },

            password: {
                value: '',
                valid: false,
                validators: [length({min: 5})],
                errorLabel: 'A password',
                errorMessage: 'Please enter at least 5 characters in the password field'

            },

            confirm_password: {
                value: '',  
                valid: false,    
                validators: [required],
                errorLabel: 'A confirmation password',
                errorMessage: 'There is a problem with the password, please try again'   
            },
        },
        error : null
    }

    closeErrorHandler = () => {
        this.setState({ error: null})
    }
    
 
    changeHandler = (input, value) => { 
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
            return {
                signupForm : updatedForm,                     
               }      
          });
    }

    checkValueHandler = (inputBeingChecked) => {
        if(inputBeingChecked.value.length < 1) {
            this.setState({
                error: {
                    title: 'Oops something went wrong',
                    message: `${inputBeingChecked.errorLabel} is required`
                }
            })
        } 
        if(inputBeingChecked.valid === false) {
            this.setState({
                error: {
                    title: 'Oops something went wrong',
                    message: inputBeingChecked.errorMessage
                }
            })
        }
    }
    

    submitHandler = (e, signupFormData) => {
        e.preventDefault();
        for ( let inputToCheck in signupFormData){
            this.checkValueHandler(signupFormData[inputToCheck]);
        }       

        if(signupFormData.password.value !== signupFormData.confirm_password.value){
                this.setState({
                    error: {
                        title:'Oops something went wrong',
                        message: 'Please enter the same password'
                }
            })
        }
    }

    

        

    render() {
        return (     
            <Fragment>
                <ErrorHandler error = {this.state.error}
                              onCloseError={this.closeErrorHandler}/>
                <Auth>          
                    <form onSubmit={e => this.submitHandler(e, this.state.signupForm)}
                        className="auth__form flex-centered-column"
                        noValidate>
                        <div>Create an account</div>
                        <Input 
                            id='name'
                            label='name*'
                            type='text'
                            control='input' //to make sure that it's an input field
                            required={true}
                            value={this.state.signupForm['name'].value}
                            onChange={this.changeHandler}
                        />
                        <Input 
                            id='email'
                            label='email*'
                            type='email'
                            control='input' //to make sure that it's an input field
                            required={true}
                            value={this.state.signupForm['email'].value}
                            onChange={this.changeHandler}
                        />
                        <Input 
                            id='password'
                            label='password*'
                            type='password'
                            control='input' 
                            required={true}
                            value={this.state.signupForm['password'].value}
                            onChange={this.changeHandler}
                        />
                        <Input 
                            id='confirm_password'
                            label='confirm password*'
                            type='password'
                            control='input' 
                            required={true}
                            value={this.state.signupForm['confirm_password'].value}
                            onChange={this.changeHandler}
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
        </Fragment>     
            
        )
    }
}               

export default Signup;
