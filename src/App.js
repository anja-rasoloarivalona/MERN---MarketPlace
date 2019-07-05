import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import './App.css';



/*------Components------------- */
import Layout from './components/Layout/Layout';
import DeskNav from './components/Navigation/DeskNav/DeskNav';
import MobileNav from './components/Navigation/MobileNav/MobileNav';
import Backdrop from './components/Backdrop/Backdrop';

/*------------Pages-----------------*/
import Shop from './Pages/ShopIndex/ShopIndex';
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
    authLoading: false,
    error: null
  }




  /*-------------MOBILE STATE HANDLER---------*/
  mobileNavHandler = isOpen => {
    this.setState({
        showMobileNav: isOpen,
        showBackdrop: isOpen
    })
  };

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, showMobileNav: false, error: null });
  };



  render() {
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
            
            <Switch>
                <Route path='/' exact component={Shop}/>
                <Route path='/admin/products' component={AdminProducts}/>
                <Route path='/auth/signup' component={AuthSignup}/>
                <Route path='/auth/login' component={AuthLogin}/>
                <Route path='/:category/:prodId' render={props => (
                      <SingleProduct {...props}/>
                )}/>
            </Switch>
        </Layout>
    </Fragment>
    )
  }
}


export default withRouter(App);
