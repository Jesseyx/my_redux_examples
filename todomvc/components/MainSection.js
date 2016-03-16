import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';

class MainSection extends Component {

  constructor(props) {
    super(props);
    this.handleToggleAllClick = this.handleToggleAllClick.bind(this);
  }

  handleToggleAllClick(e) {
    const checked = e.target.checked;
    const { todos, actions } = this.props;
    if (checked) {
      actions.completeAll();
    }
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

    const completedCount = todos.reduce((count, todo) => 
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        { this.renderToggleAll(completedCount) }
        <ul className="todo-list">
          {
            todos.map(todo =>
              <TodoItem key={ todo.id } todo={ todo } />
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