import React, { Component, Fragment} from 'react';
import Input from '../../../components/FormInput/FormInput';
import { Link } from 'react-router-dom';
import './Signup.css';
import Auth from '../Auth';
import '../Auth.css';
import Button from '../../../components/Button/Button';
import ErrorHandler from '../../../components/ErrorHandler/ErrorHandler';
import { validator } from '../../../util/validators';
import IconSvg from '../../../util/svgHandler';

class Signup extends Component {

 

    state = {
        signupForm : {

            name: {
                value: '',
                errorLabel: 'A name',
            },
            email: {
                value: '',
                errorLabel: 'An email',
            },

            password: {
                value: '',
                errorLabel: 'A password',


            },

            confirm_password: {
                value: '',  
                errorLabel: 'A confirmation password',
            },
        },
        error : null
    }

    closeErrorHandler = () => {
        this.setState({ error: null})
    }
    
 
    changeHandler = (input, value) => { 
        this.setState(prevState => {
            const updatedForm = {
              ...prevState.signupForm,
              [input]: {
                ...prevState.signupForm[input],
                value: value
              }
            };
            return {
                signupForm : updatedForm,                     
               }      
          });
    }


    

    submitHandler = (e, signupFormData) => {
        e.preventDefault();

        const errors = validator(
            signupFormData.email, 
            signupFormData.password,
            signupFormData.confirm_password,
            signupFormData.name          
           )
 
           if(errors.length > 0){
                this.setState({ error : errors});
                return
            }



        fetch('http://localhost:8000/auth/signup', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: signupFormData.name.value,
                email: signupFormData.email.value,
                password: signupFormData.password.value

            })

        })
        .then( res => {
            if(res.status === 422) {
                throw new Error (
                    "Make sure the email adress isn't used yet"
                )
            }
            if (res.status !== 200 && res.status !== 201){
                throw new Error('Creating a user failed')
            }

            return res.json()
        })

        .then(resData => {
            this.props.history.replace('/auth/login')
        })

        .catch(err => {
            let error = []
            error.push(err.message)           
            this.setState({
              error: error
            });
          });
        
        
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
                        <div className="signup__title flex-centered-row">Create an account
                            <IconSvg icon="pencil"/>
                        </div>
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
                            <div className='signup__cta'>
                                <Link to="login">Already a member?</Link>
                                <div>Forget password</div>
                            </div>
                        <Button type="submit" color="secondary">
                            Sign Up
                        </Button>
                    </form>
                </Auth>
        </Fragment>     
            
        )
    }
}               

export default Signup;
