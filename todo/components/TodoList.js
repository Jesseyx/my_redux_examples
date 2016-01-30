import React, { Component, PropTypes } from 'redux';
import Todo from './Todo';

export default class TodoList extends Component {
  render() {
    return (
      <ul>
        { this.props.todos.map((todo, index) => {
          <Todo {...todo}
            key={index}
            onClick={() => this.props.onTodoClick(index)}>
          </Todo>
        })}
      </ul>
    );
  }
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
};