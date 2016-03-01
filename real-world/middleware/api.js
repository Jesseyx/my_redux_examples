import { Schema, arrayOf, normalize } from 'normalizr';

const userSchema = new Schema('users', {
  idAttribute: 'login'
});

// Schemas for Github API responses.
export const Schemas = {
  USER: userSchema
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('CALL API');