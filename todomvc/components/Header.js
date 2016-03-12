import React, { Component, PropTypes } from 'react';
import TodoTextInput from './TodoTextInput'; 

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        { /* 没有赋值的属性默认为 true */ }
        <TodoTextInput newTodo
                       onSave={ this.handleSave }
                       placeholder="What needs to be done?" />
      </header>
    )
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default Header;