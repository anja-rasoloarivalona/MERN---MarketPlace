import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';




/*------Components------------- */
import Layout from './components/Layout/Layout';
import DeskNav from './components/Navigation/DeskNav/DeskNav';
import MobileNav from './components/Navigation/MobileNav/MobileNav';
import Backdrop from './components/Backdrop/Backdrop';
import Footer from './components/Footer/Footer';

/*------------Pages-----------------*/
import ShopIndex from './Pages/Shop/ShopIndex/ShopIndex';
import AdminProducts from './Pages/Admin/AdminProducts/AdminProducts';
import AuthSignup from './Pages/Auth/Signup/Signup';
import AuthLogin from './Pages/Auth/Login/Login';
import SingleProduct from './Pages/SingleProduct/SingleProduct';

class App extends Component {

  state = {
    /*------------MOBILE STATE-------------*/
    showBackdrop: false,
    showMobileNav: false,
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    const connectedUserId = localStorage.getItem('userId');

    if(!token || !expiryDate){
      console.log('NO TOKEN')
          return;
     } 

     if(new Date(expiryDate) <= new Date()){ 
          console.log('Token not valid anymore')
          this.props.setLoginStateToFalse()
          return;
      } 
      console.log('connected')
      this.props.setLoginStateToTrue(true, token, connectedUserId )          
      const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
      this.setAutoLogout(remainingMilliseconds);
  }

  logoutHandler = () => {
    this.props.setLoginStateToFalse();
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    this.props.history.replace('/');

  }

  setAutoLogout = timeRemaining => {
    setTimeout( () => {
      this.props.setLoginStateToFalse()
    }, timeRemaining )
  }

  /*-------------MOBILE STATE HANDLER---------*/
  mobileNavHandler = isOpen => {
    this.setState({
        showMobileNav: isOpen,
        showBackdrop: isOpen
    })
  };



  onLoadShopIndex = () => {
    this.mobileNavHandler();
    let history;
    let inputRangeValue; 

    if(this.props.category !== ''){/*If we came back from a category, reset*/     
        history = false;
        inputRangeValue = {
          min: this.props.initialPriceMin,
          max: this.props.initialPriceMax
        }
    } else {
      history = true;
      inputRangeValue = this.props.inputRangeValue /*If we came back from another page, keep the value requested*/
    }

    this.props.onLoadShopIndex(
      inputRangeValue,
      history,
        '',
        this.props.sortBy
    )
  }

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, showMobileNav: false });
  };



  render() {
    let routes = (
      <Switch>
            <Route path='/' exact component={ShopIndex}/>
            
            <Route path='/signup' component={AuthSignup}/>
            <Route path='/login' 
                render={props => (
                  <AuthLogin {...props} onUpdateState={this.onUpdateState} />
              )}/>
              <Route path='/admin/products' render={props => (
                  <AdminProducts {...props} token={this.state.token}/>
            )}/>   
            <Route exact path='/details/:prodId' component={SingleProduct}/>
            
            )}/>
            <Route exact path='/:category' component={ShopIndex}/>
              
                                        
            <Redirect to='/'/>      
        </Switch>      
    )

    return (
      <Fragment>
        {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <Layout>
            <DeskNav 
                isAuth={this.props.auth}
                onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
                onLogout={this.logoutHandler}
                onLoadShopIndex={this.onLoadShopIndex.bind(this, true)}
                />

            <MobileNav 
                isMobileNavOpen={this.state.showMobileNav}
                mobile
                onClickNavLink={this.mobileNavHandler.bind(this, false)}
                onLogout={this.logoutHandler}
                isAuth={this.props.auth}
                onLoadShopIndex={this.onLoadShopIndex.bind(this, false)}/>
            
            {routes}
            <Footer />
        </Layout>
    </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { 
      inputRangeValue: state.products.inputRangeValue,
      sortBy: state.products.sortBy,
      category: state.products.category,
      initialPriceMin: state.products.initialPriceMin,
      initialPriceMax: state.products.initialPriceMax,

      auth: state.auth.auth,
      token: state.auth.token,
      userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadShopIndex: (val, history,category, sortBy) => dispatch(actions.onLoadShopIndex(val, history,category, sortBy)),
    setLoginStateToTrue: (isAuth, token, userId) => dispatch(actions.setLoginStateToTrue(isAuth, token, userId)),
    setLoginStateToFalse: () => dispatch(actions.setLoginStateToFalse())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
