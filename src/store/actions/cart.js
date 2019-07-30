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

export const setProductsToCart = (data, auth) => {
    if(auth){
        return {
            type: actionTypes.SET_PRODUCTS_TO_CART,
            products: data.products,
            totalProductsCount: data.totalProductsCount,
            subTotalPrice: data.subTotalPrice,
            taxes: data.taxes,
            totalPrice: data.totalPrice,
            taxRate: data.taxRate,
            auth: auth
        }
    } else {
        return {
            type: actionTypes.SET_PRODUCTS_TO_CART,
            products: data
        }
    }
    
}

export const setProductsInCart = (products, token, userId) => {

    if(token && userId){

        return dispatch => {

            console.log('set happened');

            let data = new FormData();
            data.append('products', JSON.stringify(products))

            fetch('http://localhost:8000/cart/' +
                     '?userId=' + userId , {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                },          
                body: data
            })
            .then(res => {
                if(res.status !== 200 && res.status !==201){
                    throw new Error('Creating a post failed')
                }
                return res.json();
            })
            .then( resData => {
                let auth = true;
                dispatch(setProductsToCart(resData, auth))
            })
            .catch(err => {
                console.log(err)
            })
    
        }
    } else {
        return dispatch => {
            dispatch(setProductsToCart(products))
        }
    }

}




export const clearProductsInCart = () => {
    localStorage.removeItem('productsInCart');
    return {
        type: actionTypes.CLEAR_PRODUCTS_IN_CART
    }
}