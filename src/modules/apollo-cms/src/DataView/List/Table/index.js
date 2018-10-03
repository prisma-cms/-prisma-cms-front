import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Table, {
  // TableBody,
  // TableCell,
  TableFooter,
  // TableHead,
  TablePagination,
  TableRow,
  // TableSortLabel,
} from 'material-ui/Table';


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





export const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

export class TableView extends Component {

  static propTypes = {
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
    limit: PropTypes.number.isRequired,
  };


  static defaultProps = {
    orderBy: "",
    order: "asc",
    Header,
    Toolbar,
    Body,
    columnData: [],
  };

  
  constructor(props, context) {
    super(props, context);

    this.state = {
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
      rowsPerPage: 5,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {

      const {
        data,
      } = this.props;

      this.setState({ selected: data.map(n => n.id) });

      return;
    }
    this.setState({ selected: [] });
  };

  onRowSelect = (event, id) => {

    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleClick = (event, id) => {
    
    const {
      onRowClick,
    } = this.props;

    return onRowClick ? onRowClick(event, id) : false;

  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;


  getColumns(){


    const {
      columnData,
    } = this.props;

    return columnData;

  }

  render() {

    const { 
      classes,
      data,
      order, 
      orderBy, 
      title,
      Header,
      Toolbar,
      Body,
      limit,
    } = this.props;

    const { 
      selected, 
      // rowsPerPage, 
      page,
    } = this.state;


    const columnData = this.getColumns();


    const {
      objectsConnection,
    } = data;
    
    const {
      aggregate,
      // pageInfo,
      edges,
    } = objectsConnection || {}

    const {
      count = 0,
    } = aggregate || {};

    const rows = (edges && edges.map(n => n.node)) || [];

    const rowCount = rows.length;

    return (
      <Paper className={classes.root}>
        
        <Toolbar 
          numSelected={selected.length}
          title={title}
        />
        
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>

            <Header
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={rowCount}
              columnData={columnData}
            />
            
            <Body
              data={rows}
              isSelected={this.isSelected}
              handleClick={this.handleClick}
              onRowSelect={this.onRowSelect}
              columnData={columnData}
            />

            {limit ? <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={columnData.length + 1}
                  count={count}
                  rowsPerPage={limit}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter> : null}
            
          </Table>
        </div>
      </Paper>
    );
  }
}


export default withStyles(styles)(TableView);