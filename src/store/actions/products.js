import * as actionTypes from './actionsTypes';


export const setProducts = data => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products: data.products
        
    }
}

export const setMinMaxProducts = data => {
    return {
        type: actionTypes.SET_MIN_MAX_PRODUCTS,
        priceMin: data.priceMin,
        priceMax: data.priceMax
    }
}

export const setInputRangeValue = data => {
    return {
        type: actionTypes.SET_INPUT_RANGE_VALUE,
        priceMin: data.priceMin,
        priceMax: data.priceMax
    }
}

export const getProductsFailed = () => {
    return {
        type: actionTypes.GET_PRODUCTS_FAILED
    }
}

export const inputRangeChangeHandler = value => {
    return {
        type: actionTypes.INPUT_RANGE_CHANGE_HANDLER,
        min: value.min,
        max: value.max

    }
}


export const loadProductsHandler = (value, history) => {
    let min, max;
    if(value){
        min = value.min;
        max= value.max
    }

    return dispatch => {
        fetch('http://localhost:8000/test/' + min + '&&' + max )
        .then(res => {
            return res.json();
        })
        .then( resData => {
            if(!history){
                dispatch(setProducts(resData));
                dispatch(setMinMaxProducts(resData));
                dispatch(setInputRangeValue(resData))
            } else {
                dispatch(setProducts(resData));          
            }
            
        })
        .catch( error => {
            dispatch(getProductsFailed())
           console.log(error)
        })
    }
}


