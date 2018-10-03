'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Table = require('material-ui/Table');

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { withStyles } from 'material-ui/styles';

var TBody = function (_Component) {
  _inherits(TBody, _Component);

  function TBody() {
    var _temp, _this, _ret;

    _classCallCheck(this, TBody);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.isSelected = function (id) {
      var isSelected = _this.props.isSelected;


      return isSelected(id);
    }, _this.handleClick = function (event, id) {
      var handleClick = _this.props.handleClick;


      return handleClick ? handleClick(event, id) : false;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TBody.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        data = _props.data,
        onRowSelect = _props.onRowSelect,
        columnData = _props.columnData;

    // const emptyRows = 7;


    return _react2.default.createElement(
      _Table.TableBody,
      null,
      data.map(function (n, index) {
        var id = n.id;


        var isSelected = _this2.isSelected(n.id);

        var columns = columnData.map(function (record, index) {
          var fieldName = record.id,
              label = record.label,
              disablePadding = record.disablePadding,
              padding = record.padding,
              numeric = record.numeric,
              renderer = record.renderer,
              other = _objectWithoutProperties(record, ['id', 'label', 'disablePadding', 'padding', 'numeric', 'renderer']);

          var value = n[fieldName];

          return _react2.default.createElement(
            _Table.TableCell,
            _extends({
              key: index,
              padding: disablePadding === true ? "none" : padding
            }, other),
            renderer ? renderer(value, n) : value || ""
          );
        });

        return _react2.default.createElement(
          _Table.TableRow,
          {
            key: id,
            hover: true,
            onClick: function onClick(event) {
              return _this2.handleClick(event, id);
            },
            role: 'checkbox',
            'aria-checked': isSelected,
            tabIndex: -1,
            selected: isSelected
          },
          _react2.default.createElement(
            _Table.TableCell,
            { padding: 'checkbox' },
            _react2.default.createElement(_Checkbox2.default, {
              checked: isSelected,
              onChange: function onChange(event) {
                onRowSelect(event, id);
              },
              onClick: function onClick(event) {
                event.stopPropagation();
              }
            })
          ),
          columns
        );
      })
    );
  };

  return TBody;
}(_react.Component);

exports.default = TBody;
TBody.propTypes = process.env.NODE_ENV !== "production" ? {
  data: _propTypes2.default.array.isRequired,
  columnData: _propTypes2.default.array.isRequired,
  isSelected: _propTypes2.default.func.isRequired,
  handleClick: _propTypes2.default.func,
  onRowSelect: _propTypes2.default.func
} : {};
module.exports = exports['default'];