var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Table, {
// TableBody,
// TableCell,
TableFooter,
// TableHead,
TablePagination, TableRow } from
// TableSortLabel,
'material-ui/Table';

// import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
// import Checkbox from 'material-ui/Checkbox';
// import IconButton from 'material-ui/IconButton';
// import Tooltip from 'material-ui/Tooltip';
// import DeleteIcon from 'material-ui-icons/Delete';
// import FilterListIcon from 'material-ui-icons/FilterList';
// import { lighten } from 'material-ui/styles/colorManipulator';


import Header from './Header';
import Toolbar from './Toolbar';
import Body from './Body';

// let counter = 0;

// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return { id: counter, name, calories, fat, carbs, protein };
// }


export var styles = function styles(theme) {
  return {
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3
    },
    table: {
      minWidth: 800
    },
    tableWrapper: {
      overflowX: 'auto'
    }
  };
};

export var TableView = (_temp = _class = function (_Component) {
  _inherits(TableView, _Component);

  function TableView(props, context) {
    _classCallCheck(this, TableView);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.handleRequestSort = function (event, property) {
      var orderBy = property;
      var order = 'desc';

      if (_this.state.orderBy === property && _this.state.order === 'desc') {
        order = 'asc';
      }

      var data = order === 'desc' ? _this.state.data.sort(function (a, b) {
        return b[orderBy] < a[orderBy] ? -1 : 1;
      }) : _this.state.data.sort(function (a, b) {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      });

      _this.setState({ data: data, order: order, orderBy: orderBy });
    };

    _this.handleSelectAllClick = function (event, checked) {
      if (checked) {
        var data = _this.props.data;


        _this.setState({ selected: data.map(function (n) {
            return n.id;
          }) });

        return;
      }
      _this.setState({ selected: [] });
    };

    _this.onRowSelect = function (event, id) {
      var selected = _this.state.selected;

      var selectedIndex = selected.indexOf(id);
      var newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }

      _this.setState({ selected: newSelected });
    };

    _this.handleClick = function (event, id) {
      var onRowClick = _this.props.onRowClick;


      return onRowClick ? onRowClick(event, id) : false;
    };

    _this.handleChangePage = function (event, page) {
      _this.setState({ page: page });
    };

    _this.handleChangeRowsPerPage = function (event) {
      _this.setState({ rowsPerPage: event.target.value });
    };

    _this.isSelected = function (id) {
      return _this.state.selected.indexOf(id) !== -1;
    };

    _this.state = {
      selected: [],
      // data: [
      //   createData('Cupcake', 305, 3.7, 67, 4.3),
      //   createData('Donut', 452, 25.0, 51, 4.9),
      //   createData('Eclair', 262, 16.0, 24, 6.0),
      //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      //   createData('Gingerbread', 356, 16.0, 49, 3.9),
      //   createData('Honeycomb', 408, 3.2, 87, 6.5),
      //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      //   createData('Jelly Bean', 375, 0.0, 94, 0.0),
      //   createData('KitKat', 518, 26.0, 65, 7.0),
      //   createData('Lollipop', 392, 0.2, 98, 0.0),
      //   createData('Marshmallow', 318, 0, 81, 2.0),
      //   createData('Nougat', 360, 19.0, 9, 37.0),
      //   createData('Oreo', 437, 18.0, 63, 4.0),
      // ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 5
    };
    return _this;
  }

  TableView.prototype.getColumns = function getColumns() {
    var columnData = this.props.columnData;


    return columnData;
  };

  TableView.prototype.render = function render() {
    var _props = this.props,
        classes = _props.classes,
        data = _props.data,
        order = _props.order,
        orderBy = _props.orderBy,
        title = _props.title,
        Header = _props.Header,
        Toolbar = _props.Toolbar,
        Body = _props.Body,
        limit = _props.limit;
    var _state = this.state,
        selected = _state.selected,
        page = _state.page;


    var columnData = this.getColumns();

    var objectsConnection = data.objectsConnection;

    var _ref = objectsConnection || {},
        aggregate = _ref.aggregate,
        edges = _ref.edges;

    var _ref2 = aggregate || {},
        _ref2$count = _ref2.count,
        count = _ref2$count === undefined ? 0 : _ref2$count;

    var rows = edges && edges.map(function (n) {
      return n.node;
    }) || [];

    var rowCount = rows.length;

    return React.createElement(
      Paper,
      { className: classes.root },
      React.createElement(Toolbar, {
        numSelected: selected.length,
        title: title
      }),
      React.createElement(
        'div',
        { className: classes.tableWrapper },
        React.createElement(
          Table,
          { className: classes.table },
          React.createElement(Header, {
            numSelected: selected.length,
            order: order,
            orderBy: orderBy,
            onSelectAllClick: this.handleSelectAllClick,
            onRequestSort: this.handleRequestSort,
            rowCount: rowCount,
            columnData: columnData
          }),
          React.createElement(Body, {
            data: rows,
            isSelected: this.isSelected,
            handleClick: this.handleClick,
            onRowSelect: this.onRowSelect,
            columnData: columnData
          }),
          limit ? React.createElement(
            TableFooter,
            null,
            React.createElement(
              TableRow,
              null,
              React.createElement(TablePagination, {
                colSpan: columnData.length + 1,
                count: count,
                rowsPerPage: limit,
                page: page,
                backIconButtonProps: {
                  'aria-label': 'Previous Page'
                },
                nextIconButtonProps: {
                  'aria-label': 'Next Page'
                },
                onChangePage: this.handleChangePage,
                onChangeRowsPerPage: this.handleChangeRowsPerPage
              })
            )
          ) : null
        )
      )
    );
  };

  return TableView;
}(Component), _class.defaultProps = {
  orderBy: "",
  order: "asc",
  Header: Header,
  Toolbar: Toolbar,
  Body: Body,
  columnData: []
}, _temp);

TableView.propTypes = process.env.NODE_ENV !== "production" ? {
  classes: PropTypes.object.isRequired,
  // columnData: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  // refetch: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  title: PropTypes.string.isRequired,

  Header: PropTypes.func.isRequired,
  Toolbar: PropTypes.func.isRequired,
  Body: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired
} : {};
export default withStyles(styles)(TableView);