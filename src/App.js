import logo from './logo.svg';

import './App.less';

import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import middlewares from './middleware/index'
import rootReducer from './reducers'
import { ConnectedRouter, push , routerMiddleware} from 'react-router-redux'

import {createLogger} from 'redux-logger'

import SG from './containers/sg'
import Home from './containers/home';


const store = createStore(rootReducer, applyMiddleware(thunk, ...middlewares, createLogger({collapsed: true})))

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers')
        store.replaceReducer(nextRootReducer)
    })
}


class App extends Component {
  
  
  render() {
    return (
      <Provider store={ store } >
        <SG/>
      </Provider>
    );
  }
}

export default App;

