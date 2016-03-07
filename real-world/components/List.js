import React, { Component, PropTypes } from 'react';

export default class List extends Component {
  render() {
    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem, loadingLabel
    } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <h2><i>{ loadingLabel }</i></h2>
    }

    const isLastPage = !nextPageUrl;
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <div>
        { items.map(renderItem) }
        { pageCount > 0 && !isLastPage }
      </div>
    );
  }
}

List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  nextPageUrl: PropTypes.string
};

List.defaultProps = {
  isFetching: true,
  loadingLabel: 'Loading...'
};