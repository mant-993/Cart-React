import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import { createStore } from 'redux'
import mainReducer from './reducers/mainReducer'
import { Provider } from "react-redux"

const store = createStore(mainReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Home />
  </Provider>
);

