import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    products: [],
    loading: false,
    priceMin: 0,
    priceMax: 99999,
    inputRangeValue: {
        min: 1,
        max: 99998
    },
    sortBy: 'latest',
    currentPage: 1,
    totalProducts: 0,
    category: ''
};


const setProducts = (state, action) => {
    return updatedObject( state, {products: action.products})
}

const setMinMaxProducts = (state, action) => {
    return updatedObject(state, {priceMin: action.priceMin, priceMax: action.priceMax})
}

const setInputRangeValue = (state, action) => {
    let inputRangeVal = updatedObject(state.inputRangeValue, {min: action.priceMin, max: action.priceMax});
    return updatedObject(state, {inputRangeValue: inputRangeVal})
}

const priceRangeRequestedHandler = (state, action) => {
    let inputRangeVal = updatedObject(state.inputRangeValue, {min: action.min, max: action.max});
    return updatedObject(state, {inputRangeValue: inputRangeVal})
}

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_PRODUCTS: return setProducts(state, action);
        case actionTypes.SET_MIN_MAX_PRODUCTS: return setMinMaxProducts(state, action);
        case actionTypes.SET_INPUT_RANGE_VALUE: return setInputRangeValue(state, action);
        case actionTypes.SET_PRODUCTS_FAILED: return updatedObject(state, {loading: false});   
        case actionTypes.PRICE_RANGE_REQUESTED_HANDLER: return priceRangeRequestedHandler(state, action); 
        case actionTypes.UPDATE_SORT_BY: return updatedObject(state, {sortBy: action.sortBy}); 
        case actionTypes.SET_PRODUCTS_TOTAL: return updatedObject(state, {totalProducts: action.totalProducts});
        case actionTypes.PAGINATION_HANDLER: return updatedObject(state, {currentPage: action.page});
        case actionTypes.UPDATE_CATEGORY: return updatedObject(state, {category: action.category});
        case actionTypes.RESET_CATEGORY: return updatedObject(state, {category: ''})

        default: return state
    }
};

export default reducer;