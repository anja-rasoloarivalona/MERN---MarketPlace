import React from 'react';
import './Layout.css';

const layout = (props) => {
    return (
        <section className="layout">
            {props.children}
        </section>
    )
}

export default layout;
