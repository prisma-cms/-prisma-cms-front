import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';

import {
  TableBody,
  TableCell,
  // TableFooter,
  // TableHead,
  // TablePagination,
  TableRow,
  // TableSortLabel,
} from 'material-ui/Table';

import Checkbox from 'material-ui/Checkbox';

export default class TBody extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    columnData: PropTypes.array.isRequired,
    isSelected: PropTypes.func.isRequired,
    handleClick: PropTypes.func,
    onRowSelect: PropTypes.func,
  }


  isSelected = (id) => {

    const {
      isSelected,
    } = this.props;

    return isSelected(id);

  }

  
  handleClick = (event, id) => {

    const {
      handleClick,
    } = this.props;

    return handleClick ? handleClick(event, id) : false;

  }


  render() {

    const {
      data,
      // isSelected,
      onRowSelect,
      columnData,
      // ...other
    } = this.props;

    // const emptyRows = 7;
    

    return (
      <TableBody>
        {data.map((n, index) => {

          const {
            id,
          } = n;
          
          const isSelected = this.isSelected(n.id);

          const columns = columnData.map((record, index) => {
      
            const {
              id: fieldName,
              label,
              disablePadding,
              padding,
              numeric,
              renderer,
              ...other
            } = record;

            const value = n[fieldName];

            return <TableCell
              key={index}
              padding={disablePadding === true ? "none" : padding}
              {...other}
            >
              {renderer ? renderer(value, n) : value || ""}
            </TableCell>

          });


          return (
            <TableRow
              key={id}
              hover
              onClick={event => this.handleClick(event, id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={-1}
              selected={isSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox 
                  checked={isSelected}
                  onChange={event => {
                    onRowSelect(event, id);
                  }}
                  onClick={event => {
                    event.stopPropagation();
                  }}
                />
              </TableCell>
              
              {columns}

            </TableRow>
          );
        })}
      </TableBody>
    )
  }
}
