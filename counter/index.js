import React from 'react';
import { render } from 'react-dom';
// 供应商
import { Provider } from 'react-redux';
// app
import App from './containers/App';
// 配置存储
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('root')
);