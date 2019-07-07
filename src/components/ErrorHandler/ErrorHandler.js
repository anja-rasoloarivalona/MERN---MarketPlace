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
                <Modal title={props.error.title}
                        onCloseModal = {props.onCloseError}>
                    <p>{props.error.message}</p>
                </Modal>
            )}
        </Fragment>
    )


export default errorHandler;
