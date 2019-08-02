import React, { Component, Fragment } from 'react';
import './Checkout.css';
import IconSvg from '../../util/svgHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import FormUserInfo from './FormUserInfo/FormUserInfo';
import Delivery from './Delivery/Delivery';
import Payment from './Payment/Payment';
import Button from '../../components/Button/Button';

class Checkout extends Component {

    state = {
        currentPage: 'checkout',
        addresses: []
    }

    componentDidMount(){
        window.scroll(0, 0);
        this.loadAdressHandler();
    }

  


    loadAdressHandler = () => {
        const token = localStorage.getItem('token');

        if(token) {
            console.log('fetch happengin');

                    fetch('http://localhost:8000/address/',
                    {   
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    })
                    .then(res => {
                        if(res.status !== 200){
                            throw new Error('Failed to fectch adresses')
                        }
                        return  res.json();
                    })
                    .then( resData => {
                        console.log(resData);

                        this.setState({
                            addresses: resData.addresses
                        }, console.log('after fetch', this.state.addresses))
                    })
                    .catch( err => {
                        console.log(err)
                    })
            }
        
    }


    updatePage = nextPage => {
        this.setState({
            currentPage: nextPage
        }, console.log('state', this.state.currentPage))
    }

    selectAdressHander(data){
        this.props.selectAddressHandler(data);
        this.setState({currentPage: 'delivery'})   
    }

    render() {

        let addresses;

        if(this.state.addresses) {
            
            addresses = (
                <section className="checkout__addresses">
                    {
                        this.state.addresses.map( address => (
                            <article className="checkout__addresses__item">

                            <div className="checkout__addresses__item__details">
                                <div className="checkout__addresses__item__name">{address.fullname}</div>
                                <div>{address.address1}</div>
                                <div>{address.address2}</div> 
                                <div>{address.city}, {address.zip}</div>
                                <div>{address.state}</div>
                                <div>email: {address.email}</div>
                                <div>tel: {address.phoneNumber}</div>
                            </div>
                                


                                <button className="checkout__addresses__item__choose"
                                        onClick={this.selectAdressHander.bind(this, address)}>
                                    Select
                                </button>
                                <div className="checkout__addresses__item__cta">
                                    <Button color="grey">
                                        Edit
                                    </Button>
                                    <Button color="grey">
                                        Delete
                                    </Button>
                                </div>
                            </article>
                ))
                    }
                </section>
            )}
        


        return (
            <div className="checkout">
                <div className="checkout__steps">
                    <div className="checkout__steps__line">
                        <div className="checkout__steps__line__bellow"></div>
                        <div className={["checkout__steps__line__upper",

                            this.state.currentPage === 'delivery' ? 'delivery' : '',
                            this.state.currentPage === 'payment' ? 'payment' : ''  
                        ].join(' ')}></div>

                        <span className={[
                            this.state.currentPage === 'delivery' ? 'delivery' : '',
                            this.state.currentPage === 'payment' ? 'payment' : '' 
                        ].join(' ')}>
                            <IconSvg icon="cart"/>
                        </span>
                        
                    </div>
                    <div className="checkout__steps__name">
                        <div>Information</div>
                        <div>Delivery</div>
                        <div>Payment</div>
                        <div>Validation</div>
                    </div>
                </div>
                
                
                

                {                  
                    this.state.currentPage === 'checkout' && (
                        <Fragment>
                            {addresses}
                            <FormUserInfo 
                            onValidate={this.updatePage} />
                        </Fragment>
                    )
                }

                {
                    this.state.currentPage === 'delivery' && (
                        <Delivery 
                        onValidate={this.updatePage}/>
                    )
                }

                {
                    this.state.currentPage === "payment" && (
                        <Payment />
                    )
                }

                


                
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.cart.products,
        totalProductsCount: state.cart.totalProductsCount,
        subTotalPrice: state.cart.subTotalPrice,
        taxes: state.cart.taxes,
        totalPrice: state.cart.totalPrice,
        userInfos: state.cart.userInfos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectAddressHandler: (data) => dispatch(actions.selectAddressHandler(data) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

