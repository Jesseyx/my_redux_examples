import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import api from '../middleware/api';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    // 这是函数式编程中的方法，为了方便，被放到了 Redux 里。 当需要把多个 store 增强器 依次执行的时候，需要用到它。
    // 参考官方英文api
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument()
    )
  );
  

  /* test */
  // var createStoreWithMiddleware = applyMiddleware(thunk, api, createLogger())(createStore);
  // var store = createStoreWithMiddleware(rootReducer, initialState);
  // console.log(store.dispatch);
  // store.dispatch({
  //   type: 'TEST',
  //   value: 'test'
  // });

  // 这个 module 应该是 webpack 打包的时候带的
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}