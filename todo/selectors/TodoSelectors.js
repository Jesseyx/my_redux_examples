import { createSelector } from 'reselect';
import { VisibilityFilters } from './actions/action';

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
  }
}

const visibilityFilterSelector = (state) => state.visibilityFilter;
const todosSelector = (state) => state.todos;

export const visibleTodosSelector = createSelector(
  [visibilityFilterSelector, todosSelector],
  (visibilityFilter, todos) => {
    return {
      visibilityFilter,
      visibleTodos: selectTodos(todos, visibilityFilter)
    }
  }
);

// const keywordSelector = (state) => state.keyword;
// const keywordFilterSelector = createSelector(
//   [visibilityFilterSelector, keywordSelector],
//   (visibleTodos, keyword) => visibleTodos.filter(
//     todo => todo.indexOf(keyword) > -1
//   )
// );