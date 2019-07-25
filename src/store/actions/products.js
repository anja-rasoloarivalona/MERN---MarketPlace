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

export const setProductsFailed = () => {
    return {
        type: actionTypes.SET_PRODUCTS_FAILED
    }
}

export const priceRangeRequestedHandler = value => {
    return {
        type: actionTypes.PRICE_RANGE_REQUESTED_HANDLER,
        min: value.min,
        max: value.max
    }
}

export const updateSortBy = value => {
    return {
        type: actionTypes.UPDATE_SORT_BY,
        sortBy: value
    }
}

export const sortByHandler = (val, history, sortBy) => {

    console.log('sortbyhandler', sortBy)

    return dispatch => {
        dispatch(updateSortBy(sortBy));
        dispatch(loadProductsHandler(val, history, sortBy));
    }
}

export const loadProductsHandler = (value, history, sortBy ) => {
    let min, max;
    if(value){
        min = value.min;
        max= value.max
    }
    return dispatch => {
        fetch('http://localhost:8000/test/' 
                + min + '&&' + max + '/'
                + sortBy )
        .then(res => {
            return res.json();
        })
        .then( resData => {
            console.log('Fetch', sortBy);

            if(!history){
                dispatch(setProducts(resData));
                dispatch(setMinMaxProducts(resData));
                dispatch(setInputRangeValue(resData));
            } else {
                dispatch(setProducts(resData));          
            }          
        })
        .catch( error => {
            dispatch(setProductsFailed())
           console.log('error',error)
        })
    }
}


