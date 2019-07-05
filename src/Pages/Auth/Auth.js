import React from 'react';
import './Auth.css';

const auth = props => <section className="auth flex-centered-row">
                            {props.children}
                      </section>;

export default auth;