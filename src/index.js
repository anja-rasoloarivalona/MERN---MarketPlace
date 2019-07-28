import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware, compose, combineReducers} from 'redux';
import productsReducer from './store/reducers/products';
import authReducer from './store/reducers/auth';
import App from './App';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const rootReducer = combineReducers({
    products: productsReducer,
    auth: authReducer
})

const store = createStore(
    rootReducer, 
   composeEnhancers(
       applyMiddleware(thunk)
   ));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, 
document.getElementById('root')
);
