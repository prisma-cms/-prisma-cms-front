'use strict';

exports.__esModule = true;
exports.EnhancedTableToolbar = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _Toolbar = require('material-ui/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Tooltip = require('material-ui/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Delete = require('material-ui-icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _FilterList = require('material-ui-icons/FilterList');

var _FilterList2 = _interopRequireDefault(_FilterList);

var _colorManipulator = require('material-ui/styles/colorManipulator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var toolbarStyles = function toolbarStyles(theme) {
  return {
    root: {
      paddingRight: theme.spacing.unit
    },
    highlight: theme.palette.type === 'light' ? {
      color: theme.palette.secondary.dark,
      backgroundColor: (0, _colorManipulator.lighten)(theme.palette.secondary.light, 0.4)
    } : {
      color: (0, _colorManipulator.lighten)(theme.palette.secondary.light, 0.4),
      backgroundColor: theme.palette.secondary.dark
    },
    spacer: {
      flex: '1 1 100%'
    },
    actions: {
      color: theme.palette.text.secondary
    },
    title: {
      flex: '0 0 auto'
    }
  };
};

var EnhancedTableToolbar = exports.EnhancedTableToolbar = function (_Component) {
  _inherits(EnhancedTableToolbar, _Component);

  function EnhancedTableToolbar() {
    _classCallCheck(this, EnhancedTableToolbar);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  EnhancedTableToolbar.prototype.render = function render() {
    var _props = this.props,
        numSelected = _props.numSelected,
        classes = _props.classes,
        title = _props.title;


    return _react2.default.createElement(
      _Toolbar2.default,
      {
        className: [classes.root, numSelected > 0 ? classes.highlight : null].join(" ")
      },
      _react2.default.createElement(
        'div',
        { className: classes.title },
        numSelected > 0 ? _react2.default.createElement(
          _Typography2.default,
          { type: 'subheading' },
          numSelected,
          ' selected'
        ) : _react2.default.createElement(
          _Typography2.default,
          { type: 'title' },
          title
        )
      ),
      _react2.default.createElement('div', { className: classes.spacer }),
      _react2.default.createElement(
        'div',
        { className: classes.actions },
        numSelected > 0 ? _react2.default.createElement(
          _Tooltip2.default,
          { title: 'Delete' },
          _react2.default.createElement(
            _IconButton2.default,
            { 'aria-label': 'Delete' },
            _react2.default.createElement(_Delete2.default, null)
          )
        ) : _react2.default.createElement(
          _Tooltip2.default,
          { title: 'Filter list' },
          _react2.default.createElement(
            _IconButton2.default,
            { 'aria-label': 'Filter list' },
            _react2.default.createElement(_FilterList2.default, null)
          )
        )
      )
    );
  };

  return EnhancedTableToolbar;
}(_react.Component);

EnhancedTableToolbar.propTypes = process.env.NODE_ENV !== "production" ? {
  classes: _propTypes2.default.object.isRequired,
  numSelected: _propTypes2.default.number.isRequired,
  title: _propTypes2.default.string.isRequired
} : {};
exports.default = (0, _styles.withStyles)(toolbarStyles)(EnhancedTableToolbar);