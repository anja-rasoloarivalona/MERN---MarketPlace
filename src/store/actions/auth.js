import * as actionTypes from './actionsTypes';

export const loginSucceeded = data => {
    return {
        type: actionTypes.LOGIN_SUCCEEDED,
        token: data.token,
        userId: data.userId

    }
}

export const loginFailed = () => {
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

export const setLoginStateToTrue = (isAuth, token, userId) => {
    return {
        type: actionTypes.SET_LOGIN_STATE_TO_TRUE,
        isAuth: isAuth,
        token: token,
        userId: userId
    }
}

export const setLoginStateToFalse = () => {
    return {
        type: actionTypes.SET_LOGIN_STATE_TO_FALSE
    }
}


export const changeLanguage = lang => {
    return {
        type: actionTypes.CHANGE_LANGUAGE,
        lang: lang
    }
}