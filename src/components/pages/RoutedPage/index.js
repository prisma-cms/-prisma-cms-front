import React, { Component } from 'react';
import PropTypes from 'prop-types';

import gql from "graphql-tag";
import { graphql } from 'react-apollo';

const route = gql`
  query route(
    $where: RouteWhereUniqueInput!
  ){
    route(
      where: $where
    ){
      id
      name
      path
      exact
      component
    }
  }
`;

class RoutedPage extends Component {

  static propTypes = {
    PageNotFound: PropTypes.func.isRequired,
  };

  render() {

    const {
      PageNotFound,
      data: {
        loading,
        route,
      },
    } = this.props;


    if (!route) {
      if (loading) {
        return null;
      }
      else {
        return <PageNotFound />
      }
    }


    return (
      <div>
        RoutedPage
      </div>
    );
  }
}

export {
  RoutedPage,
}

export default graphql(route)(RoutedPage);