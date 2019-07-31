import React from 'react';
import './UserInfo.css';

const userInfo = () => {
    return (
        <section className="userInfo">
            <div className="checkout__title__primary">ADDRESS</div>
            <div className="userInfo__details--name">Anja Rasoloarivalona</div>
            <div className="userInfo__details">4312 Boulevard Edouard-Monpetit</div>
            <div className="userInfo__details">Montréal, H3T 1K3</div>
            <div className="userInfo__details">Canada</div>
            <div className="userInfo__details">438 123 1234</div>
        </section>
    )
}

export default userInfo
