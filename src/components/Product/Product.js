import React from 'react';
import './Product.css';
import Button from '../Button/Button';

const product = props => (
    <article className="product flex-centered-column">
        <header className="product__header flex-centered-row">
            <h1 className="product__title">{props.title}</h1>
        </header>
        <div className="product__body">
            <div>Price: <span>{props.price}</span></div>
            <p>{props.description}</p>
            
             {
                 props.shop ?
                 (
                    <div className="product__actions">
                        <Button 
                            link = {props.link}
                            color="primary"
                            to={props.link}>
                            View details
                        </Button>
                    </div>
                 ) 
                    :              
                 ( <div className="product__actions">
                        <Button 
                            link = {props.edit_link}
                            color="primary"
                            to={props.link}
                            onClick={props.onStartEdit}>
                            Edit
                        </Button>
                        <Button 
                            link = {props.delete_link}
                            color="primary"
                            to={props.link}
                            onClick={props.onDelete}>
                            Delete
                        </Button>
                    </div>
                 )
             }   
            
       
        </div>
        
    </article>
);

export default product;