import React, { Component, PropTypes } from 'react';

export default class User extends Component {
  render() {
    return (
      <div className="User">
        <Link to="/Jesseyx">
          <img src="https://avatars2.githubusercontent.com/u/13999774?v=3&s=72" width="72" height="72" />
          <h3>

          </h3>
        </Link>
      </div>
    );
  }
}

User.propTypes = {

};