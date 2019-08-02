import * as actionTypes from '../actions/actionsTypes';
import  { updatedObject } from '../utility';

const initialState = {
    products: [],
    totalProductsCount: 0,
    subTotalPrice: 0,
    taxes: 0,
    totalPrice: 0,
    taxRate: 0.15,
    userInfos: [],
    deliveryInfos: [],
    checkoutStep: 'checkout'
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


    let count = state.totalProductsCount + 1;
    let subTotalPrice = state.subTotalPrice + action.price;
    let taxes = subTotalPrice  * state.taxRate;
    let totalPrice = subTotalPrice + taxes;

    return updatedObject(state, {
                products: updatedProductsCart,
                totalProductsCount: count,
                subTotalPrice: subTotalPrice,
                taxes: taxes,
                totalPrice: totalPrice
    })
}

const delelteProduct = (state, action) => {
    let updatedProducts = state.products.filter(prod => prod.productId !== action.id);

    let count = state.totalProductsCount - 1;

    let subTotalPrice = state.subTotalPrice - action.price;
    let taxes = subTotalPrice * state.taxRate;
    let totalPrice = subTotalPrice + taxes


    return updatedObject(state, {
        products: updatedProducts,
        totalProductsCount: count,
        subTotalPrice: subTotalPrice,
        taxes: taxes,
        totalPrice: totalPrice
    })
}

const setProductsToCart = (state, action) => {

    if(action.auth){
        return updatedObject(state, {
            products: action.products,
            totalProductsCount: action.totalProductsCount,
            subTotalPrice: action.subTotalPrice,
            taxes: action.taxes,
            totalPrice: action.totalPrice,
            taxRate: action.taxRate
        })

    } else {
        let count = action.products.length;
        let subTotalPrice = 0;
        action.products.forEach(i => {
            subTotalPrice = subTotalPrice + i.price
        });
        let taxes = subTotalPrice  * state.taxRate;
        let totalPrice = subTotalPrice + taxes;
        return updatedObject(state, {
            products: action.products,
            totalProductsCount: count,
            subTotalPrice: subTotalPrice,
            taxes: taxes,
            totalPrice: totalPrice})
        }   
}

const clearCart = (state, action ) => {
    return updatedObject( state, {
        products: [],
        totalProductsCount: 0,
        subTotalPrice: 0,
        taxes: 0,
        totalPrice: 0,
        taxRate: 0.15,
        userInfos: [],
        deliveryInfos: []
    })
}

const addUserInfo = (state, action) => {
    let updatedUserInfo = updatedObject(state.userInfos, {
        fullname: action.data.fullname,
        address1: action.data.address1,
        address2: action.data.address2,
        city: action.data.city,
        state: action.data.state,
        zip: action.data.zip,
        email: action.data.email,
        phoneNumber: action.data.phoneNumber
    })
    return updatedObject(state, {
        userInfos: updatedUserInfo
    })
}

const addDeliveryInfo = (state, action) => {
    let updatedDeliveryInfo = updatedObject(state.deliveryInfos,{
        date: action.data.date,
        price: action.data.price
    })
    return updatedObject(state, {
        deliveryInfos: updatedDeliveryInfo
    } )
}


const reducer = (state = initialState, action ) => {
    switch(action.type){
        case actionTypes.ADD_PRODUCT_TO_CART: return addProductToCart(state, action);
        case actionTypes.SET_PRODUCTS_TO_CART: return setProductsToCart(state, action);
        case actionTypes.CLEAR_PRODUCTS_IN_CART: return clearCart(state, action);
        case actionTypes.DELETE_PRODUCT: return delelteProduct(state, action);
        case actionTypes.ADD_USER_INFO: return addUserInfo(state, action);
        case actionTypes.ADD_DELIVERY_INFO: return addDeliveryInfo(state, action);
        case actionTypes.UPDATE_CHECKOUT_STEP: return updatedObject(state, {checkoutStep: action.nextStep})
        
        default: return state
    }
}

export default reducer;