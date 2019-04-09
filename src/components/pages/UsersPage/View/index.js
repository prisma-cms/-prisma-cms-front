import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import {
  styles,
  TableView,
} from 'apollo-cms/lib/DataView/List/Table';


import moment from 'moment';


export class UsersPageView extends TableView {


  static defaultProps = {
    ...TableView.defaultProps,
    // listName: "companiesConnection",
    title: "Users",
    limit: 10,
    // Header,
    // Body,
    withPagination: true,
    columnData: [],
  };

  // static contextTypes = {
  //   ...TableView.contextTypes,
  //   UserLink: PropTypes.func.isRequired,
  // }


  getColumns() {

    const {
      UserLink,
    } = this.context;

    return [
      {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: this.lexicon("User"),
        renderer: (value, record) => {


          return <UserLink
            user={record}
          />;


        }
      },
      {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: this.lexicon("Reg date"),
        renderer: (value, record) => {


          return value ? moment(value).format("LL") : "";

        }
      },
    ];
  }


  render() {


    const {
      Pagination,
    } = this.context;

    const {
      page,
      withPagination,
    } = this.props;



    const {
      objectsConnection,
      loading,
      variables: {
        first: limit,
      },
    } = this.props.data;


    const {
      edges,
      aggregate,
    } = objectsConnection || {};

    const {
      count = 0,
    } = aggregate || {};

    if (!edges || !edges.length) {

      // if (loading) {
      //   return null;
      // }
      // else {
      //   return <Typography>
      //     Данные не были получены
      //   </Typography>
      // }


    }


    return <Fragment>

      {super.render()}

      {withPagination ? <Grid
        container
        spacing={0}
      >

        {edges && edges.length ? <Grid
          item
          xs={12}

        >
          <Pagination
            limit={limit}
            total={count}
            page={page || 1}
            style={{
              marginTop: 20,
            }}
          />
        </Grid> : null
        }

      </Grid> : null
      }

    </Fragment>;

  }

}


export default withStyles(styles)(props => <UsersPageView
  {...props}
/>);