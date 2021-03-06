import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import paginate from './paginate';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, repos: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ],
    mapActionToKey: action => action.login
  }),
  stargazersByRepo: paginate({
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ],
    mapActionToKey: action => action.fullName
  })
});

const rootReducer = combineReducers({
  entities,
  errorMessage,
  pagination,
  routing
});

export default rootReducer;

// APP STATE
// {
//   // 实体
//   entities: {
//     users: {},
//     repos: {}
//   },
//   // 错误信息
//   errorMessage: '',
//   // 分页信息
//   pagination: {
//     // 某个用户的点星情况
//     starredByUser: {
//       isFetching: false,
//       nextPageUrl: undefined,
//       pageCount: 0,
//       ids: []
//     },
//     // 给项目点星的用户
//     stargazersByRepo: {
//       isFetching: false,
//       nextPageUrl: undefined,
//       pageCount: 0,
//       ids: []
//     }
//   },
//   // 路由信息
//   routing: {}
// }