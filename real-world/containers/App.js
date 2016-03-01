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
    return (
      <div>
        <Explore onChange={ this.handleChange } />
        <hr />
      </div>
    );
  }
}

App.propTypes = {
  
};

function mapStateToProps(state, ownProps) {
  return {
    
  }
}

export default connect(mapStateToProps, {
  
})(App);