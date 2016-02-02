import 'babel-polyfill';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { selectSubreddit, fetchPosts } from './actions';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,            // 允许我们 dispatch() 的函数
  loggerMiddleware            // 一个很便捷的 middleware，用来在客户端打印 action 日志
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

store.dispatch(selectSubreddit('reactjs'));
store.dispatch(fetchPosts('reactjs')).then(() => 
  console.log(store.getState())
);