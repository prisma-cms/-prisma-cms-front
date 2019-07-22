import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

import View from './View';


import Page from '../../layout';
import gql from 'graphql-tag';
import PrismaCmsConnector from '@prisma-cms/connector';


export class UserPage extends Page {


  static propTypes = {
    ...Page.propTypes,
    match: PropTypes.object.isRequired,
    View: PropTypes.func.isRequired,
  }

  static defaultProps = {
    ...Page.defaultProps,
    View,
  }


  render() {


    const {
      View,
      ...other
    } = this.props;

    return super.render(<View
      {...other}
    />)
  }
}


export default class UserPageConnector extends PrismaCmsConnector {


  static propTypes = {
    ...PrismaCmsConnector.propTypes,
    View: PropTypes.func.isRequired,
  }


  static defaultProps = {
    ...PrismaCmsConnector.defaultProps,
    View: UserPage,
  }


  prepareQuery() {

    const {
      user = `
        query user (
          $where: UserWhereUniqueInput!
        ){
          object: user (
            where: $where
          ){
            id
            username
            fullname
            email
            phone
            showEmail
            showPhone
            sudo
            hasEmail
            hasPhone
          }
        }
      `,
      updateUserProcessor = `
        mutation updateUserProcessor(
          $data: UserUpdateInput!
          $where: UserWhereUniqueInput
        ) {
          response: updateUserProcessor(
            data: $data
            where: $where
          ){
            success
            message
            errors{
              key
              message
            }
            data{
              id
              username
              fullname
              email
              phone
              showEmail
              showPhone
              sudo
              hasEmail
              hasPhone
            }
          }
        }
      `,
    } = this.context.query || {};

    const {
      View,
    } = this.props;


    return compose(
      graphql(gql(user), {
        // name: 'user', 
      }),
      graphql(gql(updateUserProcessor), {
        // name: 'updateUser', 
      }),
    )(View)
  }

}

