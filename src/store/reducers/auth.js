import * as actionTypes from '../actions/actionsTypes';
import { updatedObject } from '../utility';

const initialState = {
    auth: false,
    token: null,
    userId: null,

    lang: undefined
}

const loginSucceeded = (state, action) => {
    return updatedObject(state,{
        auth: true,
        token: action.token,
        userId: action.userId
    })
}

const setLoginStateToTrue = (state, action) => {
    return updatedObject(state, {
        auth: action.isAuth,
        token: action.token,
        userId: action.userId
    })
}

const setLoginStateToFalse = (state) => {
    return updatedObject(state, {
        auth: false,
        token: null,
        userId: null,
    })
}



const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.LOGIN_SUCCEEDED: return loginSucceeded(state, action);
        case actionTypes.LOGIN_FAILED: return ;
        case actionTypes.SET_LOGIN_STATE_TO_TRUE: return setLoginStateToTrue(state, action);
        case actionTypes.SET_LOGIN_STATE_TO_FALSE: return setLoginStateToFalse(state);
        case actionTypes.CHANGE_LANGUAGE: return updatedObject(state, {lang: action.lang})
        default: return state
    }   


}

export default reducer;