import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import zip from 'lodash/zip';
import { loadUser, loadStarred } from '../actions';
import User from '../components/User';
import List from '../components/List';
import Repo from '../components/Repo';

function loadData(props) {
  const { login } = props;
  props.loadUser(login, [ 'name' ]);
  props.loadStarred(login);
}

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.renderRepo = this.renderRepo.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    // 只执行一次
    loadData(this.props);
  }

  // 渲染以后控制吗？？？？？？？？ 是的，因为下面的 login  
  componentWillReceiveProps(nextProps) {
    // console.log('UserPage-componentWillReceiveProps');
    if (nextProps.login !== this.props.login) {
      loadData(nextProps);
    }
  }

  renderRepo([repo, owner ]) {
    return (
      <Repo repo={ repo }
            owner={ owner }
            key={ repo.fullName } />
    );
  }

  handleLoadMoreClick() {
    this.props.loadStarred(this.props.login, true);
  }

  render() {
    const { user, login } = this.props;
    if (!user) {
      return <h1><i>Loading { login }’s profile...</i></h1>
    }

    const { starredRepos, starredRepoOwners, starredPagination } = this.props;
    return (
      <div>
        <User user={ user } />
        <hr />
        <List renderItem={ this.renderRepo }
              items={ zip(starredRepos, starredRepoOwners) }
              onLoadMoreClick={ this.handleLoadMoreClick }
              loadingLabel={ `Loading ${login}’s starred...` }
              { ...starredPagination } />
      </div>
    );
  }
}

UserPage.propTypes = {
  login: PropTypes.string.isRequired,
  user: PropTypes.object,
  starredPagination: PropTypes.object,
  starredRepos: PropTypes.array.isRequired,
  starredRepoOwners: PropTypes.array.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadStarred: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { login } = ownProps.params;
  const {
    entities: { users, repos },
    pagination: { starredByUser }
  } = state;
  
  const starredPagination = starredByUser[login] || { ids: [] };            // 用户 starred key-object
  const starredRepos = starredPagination.ids.map(id => repos[id]);          // 用户 starred object-array
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner]);    // [ 用户, ... ]

  return {
    login,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login]
  }
}

export default connect(mapStateToProps, {
  loadUser,
  loadStarred
})(UserPage);