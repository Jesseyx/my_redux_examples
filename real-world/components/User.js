import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class User extends Component {
  render() {
    const { login } = this.props.user;
    return (
      <div className="User">
        <Link to={ `/${ login }` }>
          <img src="https://avatars2.githubusercontent.com/u/13999774?v=3&s=72" width="72" height="72" />
          <h3>
            { login } 
          </h3>
        </Link>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
};