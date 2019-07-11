import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/FormInput/FormInput';
import './Login.css';
import Auth from '../Auth';
import Button from '../../../components/Button/Button';
import { validator } from '../../../util/validators';
import ErrorHandler from '../../../components/ErrorHandler/ErrorHandler';
import IconSvg from '../../../util/svgHandler';
import Spinner from '../../../components/Spinner/Spinner';


class Login extends Component {

    state = {
        loginForm: {
            email: {
                value: '',
                errorLabel: 'An email',
            },
            password: {
                value: '',
                errorLabel: 'A password',
            }
        },
        error: null,
        token: null,
        userId: null,
        loading: false
    }

    closeErrorHandler = () => {
        this.setState({ error: null})
    }


    loginHandler = (e, loginFormData) => {
        e.preventDefault();
        this.setState({loading: true})
       
          const errors = validator(
            loginFormData.email, 
            loginFormData.password
         )

            if(errors.length > 0){
                this.setState({ error : errors, loading: false});
                return
            }

        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: loginFormData.email.value,
                password: loginFormData.password.value
            })
        })
        .then(res => {
            if(res.status === 422) {
                throw new Error('validation failed.');
            }
            if(res.status === 401) {
                throw new Error('Wrong email address or password. Please try again')
            }
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Could not authenticate you! Please try again')
            }

            return res.json();       
        })

        .then(resData => {
            this.setState({
                token: resData.token,
                userId: resData.userId,
                loading: false
            });

            this.props.onUpdateState({token: this.state.token, 
                                    userId: this.state.userId})

            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.userId);
            const remainingMilliseconds = 60 * 60 * 1000; 
            const expiryDate = new Date(  new Date().getTime() + remainingMilliseconds  );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
            this.props.history.replace('/');
        })
        .catch(err => {
            let error = []
            error.push(err.message)
            this.setState({
                isAuth: false,
                error: error,
                loading: false
            })
        })
    }





    inputChangeHandler = (input, value) => {
       this.setState(prevState => {
           const udpatedForm = {
               ...prevState.loginForm,
               [input] : {
                   ...prevState.loginForm[input],
                   value: value
               }
           }
           return {
               loginForm: udpatedForm
           }
       })
    }



    render() {

        let form;
        if(this.state.loading === true){
            form = <Spinner />
        } else {
            form = (
            <form className="auth__form flex-centered-column"
                    onSubmit={ e => (
                        this.loginHandler(e, this.state.loginForm))}
                    noValidate>    

                        <div className="login__title flex-centered-row">Log In
                            <IconSvg icon="user"/>
                        </div>
                        <Input 
                            id='email'
                            label='email'
                            type='email'
                            control='input' //to make sure that it's an input field
                            onChange={this.inputChangeHandler}
                            required={true}
                            value={this.state.loginForm['email'].value}     
                        />
                        <Input 
                            id='password'
                            label='password'
                            type='password'
                            control='input' 
                            onChange={this.inputChangeHandler}
                            required={true}
                            value={this.state.loginForm['password'].value}
                        />
                        <div className="login__cta">
                                <Link to='/signup'>Don't have an account?</Link>
                                <div>Forget password</div>
                            </div>
                        <Button type="submit" color="secondary">
                            Login
                        </Button>
                </form>
            )
        }
        return (    
            <Fragment> 
            <ErrorHandler error = {this.state.error}
                          onCloseError={this.closeErrorHandler}/> 
            <Auth>
                {form}
            </Auth> 
            </Fragment>     
            
        )
     }
}               

export default Login;
