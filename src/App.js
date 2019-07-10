import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';



/*------Components------------- */
import Layout from './components/Layout/Layout';
import DeskNav from './components/Navigation/DeskNav/DeskNav';
import MobileNav from './components/Navigation/MobileNav/MobileNav';
import Backdrop from './components/Backdrop/Backdrop';

/*------------Pages-----------------*/
import ShopIndex from './Pages/Shop/ShopIndex/ShopIndex';
import ShopByCategory from './Pages/Shop/ShopByCategory/ShopByCategory';
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

    console.log('app did mount', token)
    console.log('app did mount', expiryDate)

   if(!token || !expiryDate){
    console.log('NO TOKEN',this.state)
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
    localStorage.removeItem('userId')
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

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, showMobileNav: false });
  };

  onUpdateState = authData => {
    this.setState({
      isAuth: true,
      token: authData.token,
      userId: authData.userId
    })
    console.log('from onudpatestate', this.state)
  }



  render() {

    let routes = (
      <Switch>
            <Route path='/' exact component={ShopIndex}/>
            <Route path='/auth/signup' component={AuthSignup}/>
            <Route path='/auth/login' 
                render={props => (
                  <AuthLogin {...props} onUpdateState={this.onUpdateState} />
            )}/>
            <Route path='/admin/products' render={props => (
                  <AdminProducts {...props} token={this.state.token}/>
            )}/>
              <Route path='/:category' render={props => (
                      <ShopByCategory {...props}/>
            )}/> 
            <Route path='/:category/:prodId' render={props => (
                      <SingleProduct {...props}/>
            )}/>  
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
                />

            <MobileNav 
                isMobileNavOpen={this.state.showMobileNav}
                mobile
                onClickNavLink={this.mobileNavHandler.bind(this, false)}
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}/>
            {routes}
        </Layout>
    </Fragment>
    )
  }
}


export default withRouter(App);
