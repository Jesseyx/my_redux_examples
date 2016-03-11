import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <h1>哈哈哈哈，我是测试h1</h1>
      </div>
    )
  }
}

App.propTypes = {

}

function mapStateToProps(state, ownProps) {
  return {

  }
}

export default connect(mapStateToProps, {

})(App);