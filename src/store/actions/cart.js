import * as actionTypes from './actionsTypes';

export const addProductToCart = (id, title, description, category, price, image) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART,
        id: id,
        title: title,
        description: description,
        category: category,
        price: price,
        image: image
    }
}