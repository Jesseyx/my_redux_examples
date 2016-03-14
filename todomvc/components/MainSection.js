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
    const { todos } = this.props;
    const notCompletedIds = [];
    const completedIds = [];
    todos.map((todo) => {
      if (todo.completed) {
        completedIds.push(todo.id);
      } else {
        notCompletedIds.push(todo.id);
      }
    });
    if (checked) {
      notCompletedIds.map((id) => console.log(id));
    } else {
      completedIds.map((id) => console.log(id));
    }
  }

  render() {
    const { todos } = this.props;

    return (
      <section className="main">
        <input className="toggle-all" type="checkbox" onClick={ this.handleToggleAllClick } />
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
  todos: PropTypes.array.isRequired
}

export default MainSection;