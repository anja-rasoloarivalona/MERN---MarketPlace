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
import Spinner from '../../../components/Spinner/Spinner';
import { FormattedMessage } from 'react-intl'

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
        error : null,
        loading: false
    }

    componentDidMount(){
        window.scrollTo(0, 0);
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
        this.setState({loading: true})
        e.preventDefault();

        const errors = validator(
            signupFormData.email, 
            signupFormData.password,
            signupFormData.confirm_password,
            signupFormData.name          
           )
 
           if(errors.length > 0){
                this.setState({ error : errors, loading: false});
                return
            }



        fetch('https://strix-market-place.herokuapp.com/auth/signup', {
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
            this.setState({ loading: false});   
            this.props.history.replace('/login');
        })

        .catch(err => {
            let error = []
            error.push(err.message)           
            this.setState({
              error: error,
              loading: false
            });
          });
        
        
    }


    defaultLoginHandler = () => {
        this.props.history.replace('../login')
    }

    

        

    render() {

        let form;
        if(this.state.loading === true) {
            form = <Spinner />
        } else form = (
                <form onSubmit={e => this.submitHandler(e, this.state.signupForm)}
                        className="auth__form flex-centered-column"
                        noValidate>
                        <div className="signup__title flex-centered-row">
                            <FormattedMessage id="createAccount" defaultMessage="Create an account"/>
                            <IconSvg icon="pencil"/>
                        </div>
                        <Input 
                            id='name'
                            label={<FormattedMessage id="fullname" defaultMessage="full name" />}
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
                            label={<FormattedMessage id="password" defaultMessage="input"/>}
                            type='password'
                            control='input' 
                            required={true}
                            value={this.state.signupForm['password'].value}
                            onChange={this.changeHandler}
                        />
                        <Input 
                            id='confirm_password'
                            label={<FormattedMessage id="confirmPassword" defaultMessage="Confirm Password" />}
                            type='password'
                            control='input' 
                            required={true}
                            value={this.state.signupForm['confirm_password'].value}
                            onChange={this.changeHandler}
                        />
                            <div className='signup__cta'>
                                <Link to="login"><FormattedMessage id="alreadyMember" defaultMessage="Already a member"/>?</Link>
                                <div><FormattedMessage id="forgetPassword" defaultMessage="Forget Password"/></div>
                            </div>
                        <Button type="submit" color="secondary">
                            <FormattedMessage id="signup" defaultMessage="Signup"/>
                        </Button>
                    </form>
        )
        return (     
            <Fragment>
                <ErrorHandler error = {this.state.error}
                              onCloseError={this.closeErrorHandler}/>
                <Auth toggleDefaultLogin = {this.defaultLoginHandler}>          
                    {form}
                </Auth>
        </Fragment>     
            
        )
    }
}               

export default Signup;
