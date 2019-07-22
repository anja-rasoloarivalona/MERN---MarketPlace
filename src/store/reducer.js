import * as actionTypes from './actions';

const initialState = {
    products: null
};

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
            }
        default: 
            return state
    }
};

export default reducer;