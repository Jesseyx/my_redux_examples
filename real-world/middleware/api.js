import { Schema, arrayOf, normalize } from 'normalizr';
// 将 key 序列化成驼峰格式
import { camelizeKeys } from 'humps';
import fetch from 'isomorphic-fetch';

const API_ROOT = 'https://api.github.com/';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      console.group('没有序列化为驼峰之前');console.log(json);console.groupEnd('没有序列化为驼峰之前');
      const camelizedJson = camelizeKeys(json);
      console.group('序列化为驼峰之后');console.log(camelizedJson);console.groupEnd('序列化为驼峰之后');

      // const nextPageUrl = getNextPageUrl(response)

      console.group('经过schema转换后');console.log(normalize(camelizedJson, schema));console.groupEnd('经过schema转换后');
      return Object.assign({}, normalize(camelizedJson, schema), { });
    });
}

const userSchema = new Schema('users', {
  idAttribute: 'login'
});

const repoSchema = new Schema('repos', {
  idAttribute: 'fullName'
});
repoSchema.define({
  owner: userSchema
});


// Schemas for Github API responses.
export const Schemas = {
  USER: userSchema,
  REPO_ARRAY: arrayOf(repoSchema)
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('CALL API');


// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
// 对 CALL_API 信息指定动作，在被派遣时执行该调用和承诺。
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
}