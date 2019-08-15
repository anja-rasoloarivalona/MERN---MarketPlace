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
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { FormattedMessage } from 'react-intl'


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
        loading: false,
        showDefaultLog: false,
        requestDefaultLog: false
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    closeErrorHandler = () => {
        this.setState({ error: null})
    }


    loginHandler = (e, loginFormData) => {
        e.preventDefault();
        this.setState({loading: true})

        if(loginFormData){
            const errors = validator(
                loginFormData.email, 
                loginFormData.password
             )
    
                if(errors.length > 0){
                    this.setState({ error : errors, loading: false});
                    return
                }
            }
             
            let emailValue;
            let passwordValue;


            if(this.state.requestDefaultLog === true) {
                emailValue = 'visitor@mail.com';
                passwordValue = '12345abc'
            } else {
                emailValue = loginFormData.email.value;
                passwordValue = loginFormData.password.value
            }

        fetch('https://strix-market-place.herokuapp.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
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
            this.props.loginSucceeded(resData);
            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.userId);
            const remainingMilliseconds = 60 * 60 * 1000; 
            const expiryDate = new Date(  new Date().getTime() + remainingMilliseconds  );
            localStorage.setItem('expiryDate', expiryDate.toISOString());         
        })
        .then(() => {
            let productsInCart = JSON.parse(localStorage.getItem('productsInCart'));
            if(productsInCart){
                const token = localStorage.getItem('token');
                const connectedUserId = localStorage.getItem('userId');
                this.props.setProductsInCart(productsInCart, token, connectedUserId);
            }
            this.props.history.replace('/admin');           
        })
        .catch(err => {
            let error = []
            error.push(err.message)
            this.setState({
                error: error,
                loading: false
            })
            this.props.loginFailed();
        })
    }

    defaultlogin = (e) => {
        this.setState({requestDefaultLog: true}, () => {
            this.loginHandler(e);
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


    toggleDefaultLogin = () => {
        this.setState( prevState => ({
            showDefaultLog: !prevState.showDefaultLog
        }))
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

                        <div className="login__title flex-centered-row"><FormattedMessage id="logIn" defaultMessage="Log In"/>
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
                            label={<FormattedMessage id="password" defaultMessage="password"/>}
                            type='password'
                            control='input' 
                            onChange={this.inputChangeHandler}
                            required={true}
                            value={this.state.loginForm['password'].value}
                        />
                        <div className="login__cta">
                                <Link to='/signup'><FormattedMessage id="dontHaveAnAccount" defaultMessage="Don't have an account"/>?</Link>
                                <div><FormattedMessage id="forgetPassword" defaultMessage="Forget password"/></div>
                            </div>
                        <Button type="submit" color="secondary">
                            <FormattedMessage id="login" defaultMessage="login"/>
                        </Button>
                </form>
            )
        }
        return (    
            <Fragment> 
            <ErrorHandler error = {this.state.error}
                          onCloseError={this.closeErrorHandler}/> 
            <Auth showDefaultLogin={this.state.showDefaultLog}
                  toggleDefaultLogin={this.toggleDefaultLogin}
                  defaultLoginHandler={this.defaultlogin}>
                {form}
            </Auth> 
            </Fragment>     
            
        )
     }
}         

const mapStateToProps = state => {
    return {
        auth: state.auth.auth,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginSucceeded: (data) => dispatch(actions.loginSucceeded(data)),
        loginFailed: () => dispatch(actions.loginFailed()),

        setProductsInCart: (products, token, userId) => dispatch(actions.setProductsInCart(products, token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
