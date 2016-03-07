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


  return store;
}