import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    products: [],
    loading: false
};

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.products
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