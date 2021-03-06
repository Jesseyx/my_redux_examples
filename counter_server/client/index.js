import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import App from '../containers/App';

// 通过服务端注入的全局变量得到初始 state
const initialState = window.__INITIAL_STATE__;

// 使用初始 state 创建 Redux store
const store = configureStore(initialState);

// 已经服务器端渲染成了html，客户端其实不需要了
// render(
//   <Provider store={ store }>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );