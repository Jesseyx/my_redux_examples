import React, { Component, PropTypes } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>1</strong>
          <span>{ ' ' }</span>
          <span>item</span>
          <span>{ ' ' }left</span>
        </span>
      </footer>
    )
  }
}

Footer.propTypes = {

}

export default Footer;