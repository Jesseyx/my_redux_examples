import React, { Component, PropTypes } from 'react';

const GITHUB_REPO = 'https://github.com/rackt/redux';

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.handleGoClick = this.handleGoClick.bind(this);
  }

  getInputValue() {
    return this.refs.input.value;
  }

  handleGoClick() {
    this.props.onChange(this.getInputValue());
  }

  render() {
    return (
      <div>
        <p>Type a username or repo full name and hit 'Go':</p>
        <input size="45" ref="input" />
        <button onClick={ this.handleGoClick }>
          Go!
        </button>
        <p>
          Code on <a href={ GITHUB_REPO } target="_blank">Github</a>.
        </p>
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
      </div>
    );
  }
}

Explore.propTypes = {
  onChange: PropTypes.func.isRequired
};