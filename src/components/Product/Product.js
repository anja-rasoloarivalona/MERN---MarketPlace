import React from 'react';
import './Product.css';
import Button from '../Button/Button';

const product = props => {

    let description = props.description;

    if(description.length > 230){
        description = description.slice(0, 230) + '...'
    }


    let cta;

    if(props.shop){
        cta = (
            <div className="product__actions flex-centered-row">
                <Button 
                    link= { {
                        pathname: `/details/${props.id}`
                    }}
                    color="primary">
                    View details
                </Button>
            </div>  
        )
    }

    if(props.admin){
        cta = (
            <div className="product__actions flex-centered-row">
                        <Button 
                            link = {props.edit_link}
                            color="primary"
                          /*  to={props.link}*/
                            onClick={props.onStartEdit}>
                            Edit
                        </Button>
                        <Button 
                            link = {props.delete_link}
                            color="primary"
                         /*   to={props.link}*/
                            onClick={props.onDelete}>
                            Delete
                        </Button>
            </div>
        )
    }

    if(props.cart){
        cta = (
                    <div className="product__actions flex-centered-row">
                        <Button 
                            link= { {
                                pathname: `/details/${props.id}`
                            }}
                            color="primary">
                            View details
                        </Button>
                        <Button onClick={props.onDelete}>
                            Delete
                        </Button>
                    </div>
        )
    }



    return (
    <article className="product">

        <div className="product__image" 
                style={{
                    backgroundImage: `url('${props.imageUrl}')`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}/>

        <div className="product__description">
            <header className="product__header">
                <h1 className="product__title">{props.title}</h1>
                <div className="product__date">{props.date}</div>
            </header>
            <p>{description}</p>
            {cta}
        </div>
        
        <div className="product__price">
            <div> ${props.price}</div> 
        </div>

        

   
        
    </article>
)};

export default product;