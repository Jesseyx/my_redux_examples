import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../actions';
import Header from '../components/Header';
import MainSection from '../components/MainSection';

class App extends Component {
  render() {
    const { todos, actions } = this.props;

    return (
      <div>
        <Header addTodo={ actions.addTodo } />
        <MainSection todos={ todos } actions={ actions } />
      </div>
    )
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  // 将在 app 内部隐藏 dispatch
  // 如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);