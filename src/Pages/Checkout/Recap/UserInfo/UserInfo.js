import React from 'react';
import './UserInfo.css';
import { connect } from 'react-redux';


const userInfo = props => {
    return (
        <section className="userInfo">
            <div className="checkout__title__primary">ADDRESS</div>
            <div className="userInfo__details--name">{props.fullname}</div>
            <div className="userInfo__details">{props.address1}</div>
            <div className="userInfo__details">{props.address2}</div>
            <div className="userInfo__details">{props.city}, {props.zip}</div>
            <div className="userInfo__details">{props.state}</div>
            <div className="userInfo__details">email: {props.email}</div>
            <div className="userInfo__details">tel: {props.phoneNumber}</div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        fullname: state.cart.userInfos.fullname,
        address1: state.cart.userInfos.address1,
        address2: state.cart.userInfos.address2,
        city: state.cart.userInfos.city,
        state: state.cart.userInfos.state,
        zip: state.cart.userInfos.zip,
        email: state.cart.userInfos.email,
        phoneNumber: state.cart.userInfos.phoneNumber
        
    }
}

export default connect(mapStateToProps)(userInfo)
