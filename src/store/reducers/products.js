import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    products: [],
    loading: false,
    priceMin: '',
    priceMax: '',
    inputRangeValue: {
        min: 0,
        max: 99999
    }
};

const reducer = ( state = initialState, action) => {
    switch(action.type){

        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.products,              
            }

        case actionTypes.SET_MIN_MAX_PRODUCTS:
            return {
                ...state,
                priceMin: action.priceMin,
                priceMax: action.priceMax,
            }

        case actionTypes.SET_INPUT_RANGE_VALUE:
            return {
                ...state,
               inputRangeValue: {
                   ...state.inputRangeValue,
                   min: action.priceMin,
                   max: action.priceMax
               }
            }
        
        case actionTypes.INPUT_RANGE_CHANGE_HANDLER:
            return {
                ...state,
                inputRangeValue: {
                    ...state.inputRangeValue,
                    min: action.min,
                    max: action.max
                }
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