'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withSnackbar() {
  return function (Component) {
    var ComponentWithSnackbar = function ComponentWithSnackbar(props, _ref) {
      var snackbar = _ref.snackbar;
      return _react2.default.createElement(Component, _extends({
        snackbar: snackbar
      }, props));
    };

    ComponentWithSnackbar.contextTypes = {
      snackbar: _propTypes2.default.object.isRequired
    };

    return ComponentWithSnackbar;
  };
}

exports.default = withSnackbar;