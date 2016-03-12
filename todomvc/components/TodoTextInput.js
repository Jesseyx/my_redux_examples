import React, { Component, PropTypes } from 'react';

class TodoTextInput extends Component {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      text: this.props.text || ''
    }
  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  render() {
    return(
      <input className="new-todo"
             type="text"
             value={ this.state.text }
             placeholder={ this.props.placeholder }
             autoFocus="true"
             onBlur={ this.handleBlur }
             onChange={ this.handleChange }
             onKeyDown={ this.handleSubmit } />
    )
  }
}

TodoTextInput.propTypes = {
  newTodo: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  text: PropTypes.string
}

export default TodoTextInput;