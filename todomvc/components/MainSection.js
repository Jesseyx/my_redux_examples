import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_COMPLETED]: todo => todo.completed,
  [SHOW_ACTIVE]: todo => !todo.completed
}

class MainSection extends Component {

  constructor(props) {
    super(props);
    this.state = { filter: SHOW_ALL };
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={ completedCount === todos.length }
               onChange={ actions.completeAll } />
      )
    }
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);

    const completedCount = todos.reduce((count, todo) => 
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        { this.renderToggleAll(completedCount) }
        <ul className="todo-list">
          {
            filteredTodos.map(todo =>
              <TodoItem key={ todo.id } todo={ todo } { ...actions } />
            )
          }
        </ul>
        <Footer />
      </section>
    )
  }
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default MainSection;