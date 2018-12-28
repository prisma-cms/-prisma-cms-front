import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CustomComponent from "../../../../../Component";

import Row from './Row';


import {
  updateUserProcessor,
} from "../../../../../query";


const userGroupsQuery = gql`
  query userGroups(
    $where: UserGroupWhereInput
  ){
    objects: userGroups(
      where:$where
    ){
      id
      name
    }
  }
`;


export class UserGroups extends CustomComponent {

  static propTypes = {
    ...CustomComponent.propTypes,
    user: PropTypes.object.isRequired,
    inEditMode: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...CustomComponent.defaultProps,
    // inEditMode: false,
  }

  static contextTypes = {
    ...CustomComponent.contextTypes,
    user: PropTypes.object,
  }


  checkHandler = async (event, checked) => {

    const {
      value,
    } = event.target;


    const {
      user: {
        id: userId,
      },
      data: {
        refetch,
      },
    } = this.props;



    let data = {};

    if (checked) {
      data = {
        Groups: {
          connect: {
            id: value,
          },
        },
      }
    }
    else {
      data = {
        Groups: {
          disconnect: {
            id: value,
          },
        },
      }
    }

    const result = await this.mutate({
      mutation: updateUserProcessor,
      variables: {
        where: {
          id: userId,
        },
        data,
      },
    });

    refetch();




  }


  render() {

    const {
      allUsersGroups,
      // userGroups: {
      //   loading: userGroupsLoading,
      //   objects: userGroups,
      // },
      data: {
        loading,
        objects,
      },
      inEditMode,
    } = this.props;

    const {
      user: currentUser,
    } = this.context;

    if(!currentUser || currentUser.sudo !== true){
      return null;
    }

    const {
      loading: allUsersGroupsLoading,
      objects: allUsersGroupsObjects,
    } = allUsersGroups || {};

    // if(allUsersGroupsLoading || userGroupsLoading){
    //   return null;
    // }

    let rows;


    /**
     * Если в режиме редактирования, то проходим все группы
     */
    if (inEditMode) {
      rows = allUsersGroupsObjects && allUsersGroupsObjects.map(n => {

        const {
          id,
        } = n;

        return <Row
          key={id}
          item={n}
          inEditMode={inEditMode}
          checked={objects && objects.findIndex(i => i.id === id) !== -1 ? true : false}
          checkHandler={this.checkHandler}
        />

      })
    }
    else {
      rows = objects && objects.map(n => {

        const {
          id,
        } = n;

        return <Row
          key={id}
          item={n}
        />

      })
    }

    return super.render(
      <div>

        {rows}

      </div>
    )
  }
}

export default compose(
  graphql(userGroupsQuery, {
    name: "allUsersGroups",
    skip: props => {


      const {
        inEditMode,
      } = props;

      return !inEditMode;
    },
    options: props => {

      /**
       * Это пока не работает так, как надо, получает каждый раз при монтировании
       */
      return {
        fetchPolicy: "cache-and-network",
        // fetchPolicy: "cache-first",
      };
    },
  }),
  graphql(userGroupsQuery, {
    // name: "userGroups",
    options: props => {

      const {
        user: {
          id,
        },
      } = props;

      return {
        fetchPolicy: "cache-and-network",
        variables: {
          where: {
            Users_some: {
              id,
            },
          },
        },
      }
    }
  }),
  // graphql(updateUserProcessor, {
  // }),
)(UserGroups);