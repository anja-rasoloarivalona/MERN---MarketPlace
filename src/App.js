import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import * as shopActions from './store/actions/index';



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

    /*USER STATE*/
    isAuth: false,
    token: null,
    userId: null,
  }

  componentDidMount(){
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

   if(!token || !expiryDate){
  //  console.log('NO TOKEN',this.state)
      return;
    }

    if(new Date(expiryDate) <= new Date()){ 
      console.log('Token not valid anymore')
        this.logoutHandler()
        return;
    }
    const connectedUserId = localStorage.getItem('userId');
    this.setState({
      isAuth: true,
      token: token,
      userId: connectedUserId     
    })

    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();

 
    this.setAutoLogout(remainingMilliseconds);

    
  }



  logoutHandler = () => {
    this.setState({ isAuth: false, token: null});
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    this.props.history.replace('/');
}

   setAutoLogout = milliseconds => {
     setTimeout(() => {
       this.logoutHandler();
     },milliseconds);
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



    //console.log('category', this.props.category)

    if(this.props.category !== ''){/*If we came back from a category, reset*/
       console.log('open shop cat', this.props.category);      
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

  onUpdateState = authData => {
    this.setState({
      isAuth: true,
      token: authData.token,
      userId: authData.userId
    })
  }



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
                isAuth={this.state.isAuth}
                onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
                onLogout={this.logoutHandler}
                onLoadShopIndex={this.onLoadShopIndex.bind(this, true)}
                />

            <MobileNav 
                isMobileNavOpen={this.state.showMobileNav}
                mobile
                onClickNavLink={this.mobileNavHandler.bind(this, false)}
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}
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
      initialPriceMax: state.products.initialPriceMax
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadShopIndex: (val, history,category, sortBy) => dispatch(shopActions.onLoadShopIndex(val, history,category, sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
