import React, { Component, PropTypes } from 'react';

class TodoItem extends Component {
  render() {
    const { todo } = this.props;

    return (
      <li className="">
        <label>{ todo.text }</label>
      </li>
    )
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

export default TodoItem;