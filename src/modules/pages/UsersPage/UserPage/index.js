import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';

import View from './View';

import {
  // user,
  updateUserProcessor,
} from '../../../query';

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


  // static contextTypes = {
  //   user: PropTypes.object,
  // }


  saveUser = async (data) => {

    const {
      updateUserProcessor,
    } = this.props;

    const {
      user: {
        user,
      },
    } = this.props;


    if (!user) {
      return false;
    }

    const {
      id,
    } = user;

    const result = await updateUserProcessor({
      variables: {
        updateUserData: data,
        updateUserWhere: {
          id,
        },
      },
    })
      .then(r => r)
      .catch(e => {
        console.error(e);
      });

    return result;

  }


  render() {


    const {
      user: currentUser,
    } = this.context;


    const {
      View,
      ...other
    } = this.props;

    // if(!user){
    //   return null;
    // }

    return super.render(<View
      // object={user}
      // data={data}
      // saveObject={this.saveUser}
      {...other}
    />)
  }
}


export default class UserPageConnector extends PrismaCmsConnector {

  prepareQuery() {

    const {
      getQueryFragment,
    } = this.props;

    if (!getQueryFragment) {
      return null;
    }

    const UserNoNestingFragment = getQueryFragment("UserNoNestingFragment");

    const user = gql`
      query user(
        $where:UserWhereUniqueInput!
      ){ 
        object:user(
          where:$where
        ){
          ...UserNoNesting
        } 
      }

      ${UserNoNestingFragment}
    `;

    return compose(
      graphql(user, {
        // name: 'user', 
      }),
      graphql(updateUserProcessor, {
        // name: 'updateUser', 
      }),
    )(UserPage)
  }

}


// export class UserPageConnectorDDD extends Component {

//   static contextTypes = {
//     getQueryFragment: PropTypes.func.isRequired,
//   }

//   shouldComponentUpdate() {
//     return false;
//   }

//   render() {

//     const {
//       getQueryFragment,
//     } = this.context;

//     const UserNoNestingFragment = getQueryFragment("UserNoNestingFragment");

//     const user = gql`
//       query user(
//         $where:UserWhereUniqueInput!
//       ){ 
//         object:user(
//           where:$where
//         ){
//           ...UserNoNesting
//         } 
//       }

//       ${UserNoNestingFragment}
//     `;

//     const Query = compose(
//       graphql(user, {
//         // name: 'user', 
//       }),
//       graphql(updateUserProcessor, {
//         // name: 'updateUser', 
//       }),

//     )(UserPage);

//     return <Query
//       {...this.props}
//     />;

//   }

// }