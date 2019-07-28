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


const reducer = (state = initialState, action ) => {
    switch(action.type){
        case actionTypes.ADD_PRODUCT_TO_CART: return addProductToCart(state, action)
        default: return state
    }
}

export default reducer;