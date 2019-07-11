import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import IconSvg from '../../util/svgHandler';


const footer = () => {
    return (
        <footer className="footer">

            <section className="footer__main">

                <div className="footer__menu">
                    <h2 className="footer__menu__header">MARKET PLACE</h2>
                    <ul className="footer__menu__list">
                        <li className="footer__menu__list__item">
                            <Link to="/">Shop</Link>
                        </li>
                        <li className="footer__menu__list__item">
                            <Link to="/login">Sell</Link>
                        </li>
                        <li className="footer__menu__list__item">About</li>
                        <li className="footer__menu__list__item">Member Benefits</li>                                              
                    </ul>
                </div>

                <div className="footer__menu">
                    <h2 className="footer__menu__header">INFO</h2>
                    <ul className="footer__menu__list">
                        <li className="footer__menu__list__item">Terms of Use</li>
                        <li className="footer__menu__list__item">Privacy Policy</li>
                        <li className="footer__menu__list__item">Posting Policy</li>                                               
                    </ul>
                </div>

                <div className="footer__menu">
                    <h2 className="footer__menu__header">SUPPORT</h2>
                    <ul className="footer__menu__list">
                        <li className="footer__menu__list__item">Help Desk</li>
                        <li className="footer__menu__list__item">FAQs</li>                                          
                    </ul>
                </div>

            </section>
            <section className="footer__social-media flex-centered-row">
                <IconSvg icon="facebook" size="big"/>
                <IconSvg icon="twitter" size="big"/>
                <IconSvg icon="instagram" size="big"/>
            </section>
            <section className="footer__copy-right">
                <div>&copy;2019 Anja Rasoloarivalona</div>
            </section>
        </footer>
    )
}

export default footer;
