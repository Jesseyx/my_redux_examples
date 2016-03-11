import { combineReducers } from 'redux';
import todos from './todos';

const rootReducer = combineReducers({
  todos
});

export default rootReducer;

// state
// [
//   {
//     text: 'the text name',
//     completed: false,
//     id: 0
//   }
// ]