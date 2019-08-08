import React from 'react';
import './Auth.css';
import authBg from '../../assets/img/auth.jpg';
import IconSvg from '../../util/svgHandler';

const auth = props => <section className="auth flex-centered-row"
                              style={{
                                    backgroundImage: `url('${authBg}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                              }}>
                              <div className={["auth__default", props.showDefaultLogin ? ' ' : 'show'].join(' ')}
                                    onClick={props.toggleDefaultLogin}>
                                    <IconSvg icon="user"/> <span onClick={props.defaultLoginHandler}>Visitor account</span>
                              </div>
                            {props.children}
                      </section>;

export default auth;