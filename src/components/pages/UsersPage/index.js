
import React from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';

// import {
//   usersConnection,
// } from '../../query';

import View from './View';

import Page from '../layout';
import gql from 'graphql-tag';


export default class UsersPage extends Page {

  static propTypes = {
    ...Page.propTypes,
    View: PropTypes.func.isRequired,
  }

  static defaultProps = {
    ...Page.defaultProps,
    View,
    first: 10,
    orderBy: "username_ASC",
  }


  // constructor(props) {

  //   super(props);

  //   // console.log("UsersPage construct", this.props);
  //   // console.log("UsersPage construct");

  //   // this.state = {}
  // }


  setPageMeta(meta) {

    return super.setPageMeta(meta || {
      title: this.lexicon("Users"),
    });

  }


  addObject(event) {

    const {
      history,
    } = this.props;

    history.push(`/users/create/`);

  }


  componentWillMount() {

    const {
      View,
    } = this.props;

    // return;

    const {
      Renderer,
    } = this.state;


    if (!Renderer) {

      const {
        usersConnection = `
          query usersConnection (
            $first: Int = 10
            $skip: Int
            $where: UserWhereInput
            $orderBy: UserOrderByInput
          ){
            objectsConnection: usersConnection (
              first: $first
              skip: $skip
              where: $where
              orderBy: $orderBy
            ){
              aggregate{
                count
              }
              edges{
                node{
                  id
                  createdAt
                  updatedAt
                  username
                  fullname
                  email
                  image
                }
              }
            }
          }
        `,
      } = this.context.query || {};

      if (usersConnection) {

        const Renderer = compose(
          graphql(gql(usersConnection), {
            // name: 'items', 
          }),

        )(View);

        Object.assign(this.state, {
          Renderer,
        });

      }

    }

    super.componentWillMount && super.componentWillMount();

  }


  render() {

    const {
      View,
      first: limit,
      data,
      ...other
    } = this.props;


    const {
      Renderer,
    } = this.state;

    if (!Renderer) {
      return null;
    }

    const {
      uri,
    } = this.context;


    let {
      page,
    } = uri.query(true);


    page = parseInt(page) || 0;

    const skip = page ? (page - 1) * limit : 0;


    return super.render(<Renderer
      // addObject={event => {
      //   this.addObject(event);
      // }}
      page={page}
      skip={skip}
      first={limit}
      limit={limit}
      data={data}
      title={this.lexicon("Users")}
      {...other}
    />)

  }

}




