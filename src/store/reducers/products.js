import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    products: [],
    loading: false,
    priceMin: '',
    priceMax: ''
};

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.products,
                priceMin: action.priceMin,
                priceMax: action.priceMax
            }
        case actionTypes.GET_PRODUCTS_FAILED:
            return {
                ...state,
                loadig: false
            }
        default: 
            return state
    }
};

export default reducer;