

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';


import PrismaCmsComponent from "@prisma-cms/component";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import View from "./View";
import { Typography } from 'material-ui';

export default class UserAutocomplete extends PrismaCmsComponent {

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    View: PropTypes.func.isRequired,
    first: PropTypes.number,
    updateObject: PropTypes.func.isRequired,
    Topic: PropTypes.object.isRequired,
    inEditMode: PropTypes.bool.isRequired,
    orderBy: PropTypes.string,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    View,
    first: 20,
    orderBy: "fullname_ASC",
  }


  componentWillMount() {

    // const {
    //   query: {
    //     users,
    //   },
    // } = this.context;

    const users = `query users(
      $first: Int
      $last: Int
      $where: UserWhereInput
      $orderBy: UserOrderByInput
    ) {
      objects: users(
        where: $where
        first: $first
        last: $last
        orderBy: $orderBy
      ) {
        id
        fullname
        username
        image
      }
    }`;

    const {
      View,
    } = this.props;

    this.Renderer = graphql(gql(users))(View);

    super.componentWillMount && super.componentWillMount();

  }

  render() {

    const {
      Renderer,
    } = this;

    const {
    } = this.context;

    const {
      where,
      ...other
    } = this.props;


    const {
      search,
      ...otherFilters
    } = this.getFilters();

    let filters = {
      ...otherFilters,
    }

    if (search) {
      Object.assign(filters, {
        OR: [
          {
            username_contains: search,
          },
          {
            fullname_contains: search,
          },
          {
            email_contains: search,
          },
        ],
      });
    }

    let content = null;

    content = <Renderer
      getFilters={() => this.getFilters()}
      setFilters={(filters) => this.setFilters(filters)}
      where={{
        AND: [
          {
            ...where,
          }
          , {
            ...filters
          }
        ]
      }}
      // onChange={(event, value) => {

      //   this.setFilters({
      //     name_contains: value && value.trim() || undefined,
      //   })
      // }}
      {...other}
    />;


    return content;
  }

}

