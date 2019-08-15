import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import IconSvg from '../../util/svgHandler';

import { FormattedMessage} from 'react-intl';


const footer = () => {
    return (
        <footer className="footer">

            <section className="footer__main">

                <div className="footer__menu">
                    <h2 className="footer__menu__header">MARKET PLACE</h2>
                    <ul className="footer__menu__list">
                        <li className="footer__menu__list__item">
                            <Link to="/"><FormattedMessage id="shop" defaultMessage="Shop"/></Link>
                        </li>
                        <li className="footer__menu__list__item"><FormattedMessage id="about" defaultMessage="About"/></li>
                        <li className="footer__menu__list__item"><FormattedMessage id="memberBenefits" defaultMessage="Member Benefits"/></li>                                              
                    </ul>
                </div>

                <div className="footer__menu">
                    <h2 className="footer__menu__header"><FormattedMessage id="info" defaultMessage="INFO"/></h2>
                    <ul className="footer__menu__list">
                        <li className="footer__menu__list__item"><FormattedMessage id="termsOfUse" defaultMessage="Terms of use"/></li>
                        <li className="footer__menu__list__item"><FormattedMessage id="privacyPolicy" defaultMessage="Privacy Policy"/></li>
                        <li className="footer__menu__list__item"><FormattedMessage id="postingPolicy" defaultMessage="Posting Policy"/></li>                                               
                    </ul>
                </div>

                <div className="footer__menu">
                    <h2 className="footer__menu__header"><FormattedMessage id="support" defaultMessage="SUPPORT"/></h2>
                    <ul className="footer__menu__list">
                        <li className="footer__menu__list__item"><FormattedMessage id="helpDesk" defaultMessage="Help desk"/></li>
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
