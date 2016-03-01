import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import RepoPage from './containers/RepoPage';
import UserPage from './containers/UserPage';

export default (
  <Route path="/" component={ App }>
    <Route path="/:login"
           component={ UserPage } />
  </Route>
);