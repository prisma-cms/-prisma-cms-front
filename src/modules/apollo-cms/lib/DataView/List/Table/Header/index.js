'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Table = require('material-ui/Table');

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Tooltip = require('material-ui/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnhancedTableHead = (_temp2 = _class = function (_Component) {
  _inherits(EnhancedTableHead, _Component);

  function EnhancedTableHead() {
    var _temp, _this, _ret;

    _classCallCheck(this, EnhancedTableHead);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.createSortHandler = function (property) {
      return function (event) {
        _this.props.onRequestSort(event, property);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  EnhancedTableHead.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        onSelectAllClick = _props.onSelectAllClick,
        order = _props.order,
        orderBy = _props.orderBy,
        numSelected = _props.numSelected,
        rowCount = _props.rowCount,
        columnData = _props.columnData;


    return _react2.default.createElement(
      _Table.TableHead,
      null,
      _react2.default.createElement(
        _Table.TableRow,
        null,
        _react2.default.createElement(
          _Table.TableCell,
          { padding: 'checkbox' },
          _react2.default.createElement(_Checkbox2.default, {
            indeterminate: numSelected > 0 && numSelected < rowCount,
            checked: numSelected === rowCount,
            onChange: onSelectAllClick
          })
        ),
        columnData.map(function (column) {
          return _react2.default.createElement(
            _Table.TableCell,
            {
              key: column.id,
              numeric: column.numeric,
              padding: column.disablePadding ? 'none' : 'default',
              sortDirection: orderBy === column.id ? order : false
            },
            _react2.default.createElement(
              _Tooltip2.default,
              {
                title: 'Sort',
                placement: column.numeric ? 'bottom-end' : 'bottom-start',
                enterDelay: 300
              },
              _react2.default.createElement(
                _Table.TableSortLabel,
                {
                  active: orderBy === column.id,
                  direction: order,
                  onClick: _this2.createSortHandler(column.id)
                },
                column.label
              )
            )
          );
        }, this)
      )
    );
  };

  return EnhancedTableHead;
}(_react.Component), _class.defaultProps = {}, _temp2);
exports.default = EnhancedTableHead;
EnhancedTableHead.propTypes = process.env.NODE_ENV !== "production" ? {
  numSelected: _propTypes2.default.number.isRequired,
  onRequestSort: _propTypes2.default.func.isRequired,
  onSelectAllClick: _propTypes2.default.func.isRequired,
  order: _propTypes2.default.string.isRequired,
  orderBy: _propTypes2.default.string.isRequired,
  rowCount: _propTypes2.default.number.isRequired,
  columnData: _propTypes2.default.array.isRequired
} : {};
module.exports = exports['default'];