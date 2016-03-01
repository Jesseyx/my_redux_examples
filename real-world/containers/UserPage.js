import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import User from '../components/User';
// import List from '../components/List';

class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <User />
        <hr />
        // <List />
      </div>
    );
  }
}

UserPage.propTypes = {

};

function mapStateToProps(state, ownProps) {
  return {

  }
}

export default connect(mapStateToProps, {

})(UserPage);