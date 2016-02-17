import React, { Component, PropTypes } from 'react';

export default class Posts extends Component {
  render() {
    return (
      <ul>
        { this.props.posts.map((post, i) =>
            <li key={ i }>{ post.title }</li>
          )
        }
      </ul>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired).isRequired
};