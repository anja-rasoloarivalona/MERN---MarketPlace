import React, { Fragment } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';


const errorHandler = props => 
    (   
        <Fragment>
            {props.error && (
                <Backdrop onClick={props.onCloseError}/>
            )}

            {props.error && (
                <Modal title='Oops something went wrong'
                        onCloseModal = {props.onCloseError}>
                    <p>{props.error[0]}</p>
                </Modal>
            )}
        </Fragment>
    )


export default errorHandler;
