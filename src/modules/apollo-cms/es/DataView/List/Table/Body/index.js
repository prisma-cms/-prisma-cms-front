var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';

import { TableBody, TableCell,
// TableFooter,
// TableHead,
// TablePagination,
TableRow } from
// TableSortLabel,
'material-ui/Table';

import Checkbox from 'material-ui/Checkbox';

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


    return React.createElement(
      TableBody,
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

          return React.createElement(
            TableCell,
            _extends({
              key: index,
              padding: disablePadding === true ? "none" : padding
            }, other),
            renderer ? renderer(value, n) : value || ""
          );
        });

        return React.createElement(
          TableRow,
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
          React.createElement(
            TableCell,
            { padding: 'checkbox' },
            React.createElement(Checkbox, {
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
}(Component);

export { TBody as default };
TBody.propTypes = process.env.NODE_ENV !== "production" ? {
  data: PropTypes.array.isRequired,
  columnData: PropTypes.array.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  onRowSelect: PropTypes.func
} : {};