import { createStore } from 'redux';
import todoApp from '../reducers/reducers';

// 测试用
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions/action';

let store = createStore(todoApp);

/****** 测试用 ******/
console.log(store.getState());
// 监听事件
let unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
// 发起一系列 action
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));

store.dispatch(completeTodo(0));
store.dispatch(completeTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));