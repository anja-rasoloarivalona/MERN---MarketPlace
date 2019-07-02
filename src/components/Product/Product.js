import React from 'react';
import './Product.css';
import Button from '../Button/Button';

const product = props => (
    <article className="product">

        <div className="product__image">
                image
        </div>
        <div className="product__description">
            <header className="product__header">
                <h1 className="product__title">{props.title}</h1>
                <div className="product__date">{props.date}</div>
            </header>
            <p>{props.description}</p>
            {
                 props.shop ?
                 (
                    <div className="product__actions flex-centered-row">
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
        
        <div className="product__price">
            <div> $ {props.price}</div> 
        </div>

        

   
        
    </article>
);

export default product;