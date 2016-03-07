import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadRepo } from '../actions';
import Repo from '../components/Repo';
import User from '../components/User';
import List from '../components/List';

function loadData(props) {
  const { fullName } = props;
  props.loadRepo(fullName, [ 'description'] );
}

class RepoPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props);
  }

  render() {
    const { repo, owner, name } = this.props;
    if (!repo || !owner) {
      return <h1><i>Loading {name} details...</i></h1>;
    }

    return (
      <div>
        <Repo repo={ repo }
              owner={ owner } />
        <hr />
      </div>
    )
  }
}

RepoPage.propTypes = {
  repo: PropTypes.object,
  fullName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
  const { login, name } = ownProps.params;
  const {
    entities: { users, repos }
  } = state;

  const fullName = `${ login }/${ name }`;

  return {
    fullName,
    name,
    repo: repos[fullName],
    owner: users[login]
  }
}

export default connect(mapStateToProps, {
  loadRepo
})(RepoPage);