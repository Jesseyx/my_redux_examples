import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import User from '../components/User';

function loadData(props) {
  const { login } = props;
  console.log(login);
}

class UserPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props);
  }

  render() {
    const { user, login } = this.props;
    if (!user) {
      return <h1><i>Loading { login }’s profile...</i></h1>
    }


    return (
      <div>
        
        <hr />
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