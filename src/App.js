import React, { Component, Fragment } from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';



/*------Components------------- */
import Layout from './components/Layout/Layout';
import DeskNav from './components/Navigation/DeskNav/DeskNav';
import MobileNav from './components/Navigation/MobileNav/MobileNav';
import Backdrop from './components/Backdrop/Backdrop';

/*------------Pages-----------------*/
import Shop from './Pages/ShopIndex/ShopIndex';
import AdminAddProduct from './Pages/Admin/AddProduct/AddProduct';

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
                <Route path='/admin/add-product' exact component={AdminAddProduct}/>
            </Switch>
        </Layout>
    </Fragment>
    )
  }
}


export default App;
