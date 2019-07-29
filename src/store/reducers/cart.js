import * as actionTypes from '../actions/actionsTypes';
import  { updatedObject } from '../utility';

const initialState = {
    products: [],
    totalProductsCount: 0,
    subTotalPrice: 0,
    taxes: 0,
    totalPrice: 0,
}

const addProductToCart = (state, action) => {
    let updatedProductsCart = [...state.products, {
        productId: action.id,
        title: action.title,
        description: action.description,
        category: action.category,
        price: action.price,
        image: action.image
        }
    ]
    return updatedObject(state, {
                products: updatedProductsCart
    })
}

const setProductsToCart = (state, action) => {
    return updatedObject(state, {products: action.products})
}


const reducer = (state = initialState, action ) => {
    switch(action.type){
        case actionTypes.ADD_PRODUCT_TO_CART: return addProductToCart(state, action);
        case actionTypes.SET_PRODUCTS_TO_CART: return setProductsToCart(state, action);
        case actionTypes.CLEAR_PRODUCTS_IN_CART: return updatedObject(state, {products: []})
        default: return state
    }
}

export default reducer;