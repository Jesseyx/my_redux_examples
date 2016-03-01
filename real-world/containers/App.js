import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Explore from '../components/Explore';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(nextValue) {
    browserHistory.push(`/${ nextValue }`);
  }

  render() {
    const { children, inputValue } = this.props;

    return (
      <div>
        <Explore value={ inputValue }
                 onChange={ this.handleChange } />
        <hr />

        { children }
      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  inputValue: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
    // 获取浏览器地址
    inputValue: ownProps.location.pathname.substring(1)
  }
}

export default connect(mapStateToProps, {
  
})(App);