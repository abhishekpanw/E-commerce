import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers';
import rootSaga from './sagas';
 
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware,thunk]

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);

export default store;