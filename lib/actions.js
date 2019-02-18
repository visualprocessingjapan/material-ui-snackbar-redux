'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('./types');

var show = function show(payload) {
  return {
    type: _types.SHOW,
    payload: payload
  };
};

var dismiss = function dismiss(payload) {
  return {
    type: _types.DISMISS,
    payload: payload
  };
};

exports.default = { show: show, dismiss: dismiss };