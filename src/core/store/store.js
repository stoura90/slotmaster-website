import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import root from "./reducers";

const middleware = applyMiddleware(thunkMiddleware, logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(root, composeEnhancers(middleware));

