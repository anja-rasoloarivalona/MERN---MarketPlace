import React from 'react';
import './Auth.css';
import authBg from '../../assets/img/auth.jpg';

const auth = props => <section className="auth flex-centered-row"
                              style={{
                                    backgroundImage: `url('${authBg}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                              }}>
                            {props.children}
                      </section>;

export default auth;