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
  return {
    errorMessage: state.errorMessage,
    // 获取浏览器地址
    inputValue: ownProps.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(App);