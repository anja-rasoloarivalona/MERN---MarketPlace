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
    if(direction === 'previous') {
        page = currentPage - 1
    } else {
        page = currentPage + 1
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
        dispatch(loadProductsHandler(val, history, category,  sortBy))
    }
}

export const onLoadShopIndex = (value, history, category, sortBy) => {
    return dispatch => {
        dispatch(resetCategory());
        dispatch(loadProductsHandler(value, history, category,  sortBy));
    }
}

export const loadProductsHandler = (value, history, category, sortBy, page) => {
    let min, max;
    if(value){
        min = value.min;
        max= value.max
    }

    
    return dispatch => {

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
            if(!history){               
                console.log('fetch reset');
                dispatch(setProducts(resData));
                dispatch(setMinMaxProducts(resData));
               dispatch(setInputRangeValue(resData));
               dispatch(setProductsTotal(resData));
               
               if(!category){
                    dispatch(setInitPriceProducts(resData));
               }
            } else {
                console.log('fetch no reset, we have history', history)
                console.log('sortby', sortBy)
                dispatch(setProducts(resData));   
                dispatch(setProductsTotal(resData));    
            }          
        })
        .catch( error => {
            dispatch(setProductsFailed())
           console.log('error',error)
        })
    }
}


