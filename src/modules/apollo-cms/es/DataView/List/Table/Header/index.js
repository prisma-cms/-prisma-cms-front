var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
// TableBody,
TableCell,
// TableFooter,
TableHead,
// TablePagination,
TableRow, TableSortLabel } from 'material-ui/Table';

import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';

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


    return React.createElement(
      TableHead,
      null,
      React.createElement(
        TableRow,
        null,
        React.createElement(
          TableCell,
          { padding: 'checkbox' },
          React.createElement(Checkbox, {
            indeterminate: numSelected > 0 && numSelected < rowCount,
            checked: numSelected === rowCount,
            onChange: onSelectAllClick
          })
        ),
        columnData.map(function (column) {
          return React.createElement(
            TableCell,
            {
              key: column.id,
              numeric: column.numeric,
              padding: column.disablePadding ? 'none' : 'default',
              sortDirection: orderBy === column.id ? order : false
            },
            React.createElement(
              Tooltip,
              {
                title: 'Sort',
                placement: column.numeric ? 'bottom-end' : 'bottom-start',
                enterDelay: 300
              },
              React.createElement(
                TableSortLabel,
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
}(Component), _class.defaultProps = {}, _temp2);
export { EnhancedTableHead as default };
EnhancedTableHead.propTypes = process.env.NODE_ENV !== "production" ? {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columnData: PropTypes.array.isRequired
} : {};