import React from 'react';
import './Auth.css';
import authBg from '../../assets/img/auth.jpg';
import IconSvg from '../../util/svgHandler';
import { FormattedMessage } from 'react-intl'

const auth = props => <section className="auth flex-centered-row"
                              style={{
                                    backgroundImage: `url('${authBg}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                              }}>
                              <div className={["auth__default", props.showDefaultLogin ? ' ' : 'show'].join(' ')}
                                    onClick={props.toggleDefaultLogin}>
                                    <IconSvg icon="user"/> <span onClick={props.defaultLoginHandler}><FormattedMessage id="recruiterAccount" defaultMessage="Recruiter"/></span>
                              </div>
                            {props.children}
                      </section>;

export default auth;