import * as actionTypes from './actionsTypes';


export const setProducts = data => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products: data.products,
        priceMin: data.priceMin,
        priceMax: data.priceMax
    }
}

export const getProductsFailed = () => {
    return {
        type: actionTypes.GET_PRODUCTS_FAILED
    }
}

export const loadProductsHandler = value => {

    let min, max;

    if(value){
        min = value.min;
        max= value.max
    }

    console.log('before fetch', value)

    return dispatch => {


        fetch('http://localhost:8000/test/' + min + '&&' + max )
        .then(res => {
            return res.json();
        })
        .then( resData => {
            dispatch(
                setProducts(resData));
        })
        .catch( error => {
            dispatch(getProductsFailed())
           console.log(error)
        })
    }
}


