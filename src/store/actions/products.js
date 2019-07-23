import * as actionTypes from './actionsTypes';


export const setProducts = products => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products: products
    }
}

export const getProductsFailed = () => {
    return {
        type: actionTypes.GET_PRODUCTS_FAILED
    }
}

export const loadProductsHandler= () => {
    return dispatch => {
        fetch('http://localhost:8000/test')
        .then(res => {
            return res.json();
        })
        .then( resData => {
            dispatch(
                setProducts(resData.products));
        })
        .catch( error => {
            dispatch(getProductsFailed())
           console.log(error)
        })
    }
}