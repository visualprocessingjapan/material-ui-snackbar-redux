'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Snackbar = require('@material-ui/core/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SnackbarProvider = function (_PureComponent) {
  _inherits(SnackbarProvider, _PureComponent);

  function SnackbarProvider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SnackbarProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SnackbarProvider.__proto__ || Object.getPrototypeOf(SnackbarProvider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      message: null,
      action: null
    }, _this.handleClose = function (event, reason) {
      if (reason === 'clickaway') return;
      _this.setState({ open: false, handleAction: null });
    }, _this.handleExited = function () {
      _this.processQueue();
    }, _this.handleActionClick = function () {
      _this.handleClose();
      _this.state.handleAction();
    }, _this.processQueue = function () {
      if (_this.props.snackbar) {
        var _this$props$snackbar = _this.props.snackbar,
            message = _this$props$snackbar.message,
            action = _this$props$snackbar.action,
            handleAction = _this$props$snackbar.handleAction;

        _this.setState({ open: true, message: message, action: action, handleAction: handleAction });
        _this.props.dismiss(_this.props.snackbar.id);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SnackbarProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        snackbar: {
          show: this.props.show
        }
      };
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.snackbar !== prevProps.snackbar) {
        if (this.props.snackbar) {
          if (this.state.open) {
            this.setState({ open: false });
          } else {
            this.processQueue();
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          _props$SnackbarProps = _props.SnackbarProps,
          SnackbarProps = _props$SnackbarProps === undefined ? {} : _props$SnackbarProps;
      var _state = this.state,
          action = _state.action,
          message = _state.message,
          open = _state.open;


      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        children,
        _react2.default.createElement(_Snackbar2.default, _extends({}, SnackbarProps, {
          open: open,
          message: message || '',
          action: action && _react2.default.createElement(
            _Button2.default,
            { color: 'secondary', size: 'small', onClick: this.handleActionClick },
            action
          ),
          onClose: this.handleClose,
          onExited: this.handleExited
        }))
      );
    }
  }]);

  return SnackbarProvider;
}(_react.PureComponent);

SnackbarProvider.childContextTypes = {
  snackbar: _propTypes2.default.object
};

SnackbarProvider.propTypes = {
  children: _propTypes2.default.node,
  SnackbarProps: _propTypes2.default.object
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    snackbar: state.snackbar.queue[0] || null
  };
}, function (dispatch) {
  return {
    show: function show(message, action, handleAction) {
      return dispatch(_actions2.default.show({ message: message, action: action, handleAction: handleAction }));
    },
    dismiss: function dismiss(id) {
      return dispatch(_actions2.default.dismiss({ id: id }));
    }
  };
})(SnackbarProvider);