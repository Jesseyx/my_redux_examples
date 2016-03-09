import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Explore from '../components/Explore';
import { resetErrorMessage } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  handleChange(nextValue) {
    // 历史记录改变后，就会触发 router, router 改变就会涉及组件，再调用组件内部的 componentWillMount 回调
    browserHistory.push(`/${ nextValue }`);
  }

  handleDismissClick(e) {
    e.preventDefault();
    this.props.resetErrorMessage();
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{ errorMessage }</b>
        { ' ' }
        (<a href="#"
            onClick={ this.handleDismissClick }>
          Dismiss
        </a>)
      </p>
    );
  }

  render() {
    // console.log(this.props);
    const { children, inputValue } = this.props;

    return (
      <div>
        <Explore value={ inputValue }
                 onChange={ this.handleChange } />
        <hr />
        { this.renderErrorMessage() }
        { children }
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state, ownProps) {
  // console.log('App-mapStateToProps');console.log(ownProps);
  return {
    errorMessage: state.errorMessage,
    // 获取浏览器地址
    inputValue: ownProps.location.pathname.substring(1)
  }
}

// 连接操作不会改变原来的组件类，反而返回一个新的已与 Redux store 连接的组件类。
// connect 操作不会改变 react 内部的 props，只是返回了一个被包装过的 component 类，
// 该类通过 mapStateToProps 最终生成一个 props 在 包装过的组件内维持，
// 所以 ownProps（react 内部的 props) 和 组件内的 this.props (包装过的组件中的 props) 不同
export default connect(mapStateToProps, {
  resetErrorMessage
})(App);