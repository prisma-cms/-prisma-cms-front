function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';

import { lighten } from 'material-ui/styles/colorManipulator';

var toolbarStyles = function toolbarStyles(theme) {
  return {
    root: {
      paddingRight: theme.spacing.unit
    },
    highlight: theme.palette.type === 'light' ? {
      color: theme.palette.secondary.dark,
      backgroundColor: lighten(theme.palette.secondary.light, 0.4)
    } : {
      color: lighten(theme.palette.secondary.light, 0.4),
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

export var EnhancedTableToolbar = function (_Component) {
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


    return React.createElement(
      Toolbar,
      {
        className: [classes.root, numSelected > 0 ? classes.highlight : null].join(" ")
      },
      React.createElement(
        'div',
        { className: classes.title },
        numSelected > 0 ? React.createElement(
          Typography,
          { type: 'subheading' },
          numSelected,
          ' selected'
        ) : React.createElement(
          Typography,
          { type: 'title' },
          title
        )
      ),
      React.createElement('div', { className: classes.spacer }),
      React.createElement(
        'div',
        { className: classes.actions },
        numSelected > 0 ? React.createElement(
          Tooltip,
          { title: 'Delete' },
          React.createElement(
            IconButton,
            { 'aria-label': 'Delete' },
            React.createElement(DeleteIcon, null)
          )
        ) : React.createElement(
          Tooltip,
          { title: 'Filter list' },
          React.createElement(
            IconButton,
            { 'aria-label': 'Filter list' },
            React.createElement(FilterListIcon, null)
          )
        )
      )
    );
  };

  return EnhancedTableToolbar;
}(Component);

EnhancedTableToolbar.propTypes = process.env.NODE_ENV !== "production" ? {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
} : {};
export default withStyles(toolbarStyles)(EnhancedTableToolbar);