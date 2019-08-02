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

export const setInitPriceProducts = data => {
    return {
        type: actionTypes.SET_INITIAL_PRODUCTS_PRICE,
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

export const setProductsTotal = data => {
    return {
        type: actionTypes.SET_PRODUCTS_TOTAL,
        totalProducts: data.totalProducts
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

export const updateCurrentPage = page => {
    return {
        type: actionTypes.PAGINATION_HANDLER,
        page: page
    }
}

export const paginationHandler = (val, history,category,  sortBy, currentPage, direction) => {
    let page;

    console.log('pagination action', direction)

    if(direction === 'previous') {
        page = currentPage - 1
    } else {
        if(direction === 'next'){
            page = currentPage + 1
        } else {
            page = direction
        }
    }

    return dispatch => {
        dispatch(updateCurrentPage(page));
        dispatch(loadProductsHandler(val, history,category,  sortBy, page))
    }
}

export const sortByHandler = (val, history,category,  sortBy) => {
    return dispatch => {
        dispatch(updateSortBy(sortBy));
        dispatch(loadProductsHandler(val, history, category, sortBy));
    }
}

export const resetCurrentPage = () => {
    return {
        type: actionTypes.RESET_CURRENT_PAGE
    }
}


export const updateCategory = (category) => {
    return {
        type: actionTypes.UPDATE_CATEGORY,
        category: category
    }
}

export const resetCategory = () => {
    return {
        type: actionTypes.RESET_CATEGORY
    }
}

export const categoryHandler = (val, history, category,  sortBy) => {
    return dispatch => {
        dispatch(updateCategory(category));
        dispatch(resetCurrentPage());
        dispatch(loadProductsHandler(val, history, category,  sortBy))
    }
}

export const onLoadShopIndex = (value, history, category, sortBy) => {
    return dispatch => {
        dispatch(resetCategory());
        dispatch(loadProductsHandler(value, history, category,  sortBy));
    }
}

export const setLoadingToTrue = () => {
    return {
        type: actionTypes.SET_LOADING_TO_TRUE
    }
}

export const setLoadingToFalse = () => {
    return {
        type: actionTypes.SET_LOADING_TO_FALSE
    }
}

export const loadProductsHandler = (value, history, category, sortBy, page) => {
    let min, max;
    if(value){
        min = value.min;
        max= value.max
}


    
    return dispatch => {

        dispatch(setLoadingToTrue())

        fetch('http://localhost:8000/test/' 
                + min + '&&' + max + '/'
                + sortBy + '/' +
                '?page=' + page + '&' +
                'category=' + category
        )
        .then(res => {
            return res.json();
        })
        .then( resData => {
            dispatch(setLoadingToFalse());
            if(!history){               
                dispatch(setProducts(resData));
                dispatch(setMinMaxProducts(resData));
                dispatch(setInputRangeValue(resData));
                dispatch(setProductsTotal(resData));
               
               if(!category){
                    dispatch(setInitPriceProducts(resData));
               }
            } else {
                dispatch(setProducts(resData));   
                dispatch(setProductsTotal(resData));    
            }          
        })
        .catch( error => {
            dispatch(setLoadingToFalse());
            dispatch(setProductsFailed());
           console.log('error',error)
        })
    }
}


