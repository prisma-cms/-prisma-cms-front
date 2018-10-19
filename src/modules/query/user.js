

import gql from 'graphql-tag';

import {
  userFieldsFragment,
} from "./fragments";

 
export const fragmentUser = `
  fragment user on User {
    ...userFields
  }

  ${userFieldsFragment}
`;

 

export const usersConnection = gql`
  query usersConnection(
    $first:Int!
    $skip:Int
    $orderBy: UserOrderByInput!
    $where:UserWhereInput
  ){
    objectsConnection:usersConnection(
      first: $first
      skip: $skip
      orderBy: $orderBy
      where:$where
    ){
      aggregate{
        count
      }
      edges{
        node{
          ...user
        }
      }
    }
  }

  ${fragmentUser}
`;


export const users = gql`
  query usersConnection(
    $first:Int!
    $skip:Int
    $orderBy: UserOrderByInput
    $where:UserWhereInput
  ){
    objects:users(
      first: $first
      skip: $skip
      orderBy: $orderBy
      where:$where
    ){
      ...user
    }
  }

  ${fragmentUser}
`;



export const my = gql`
  query me{
    me{
      ...user
    }
  }

  ${fragmentUser}
`;



export const user = gql`
  query userByUsername(
    $where:UserWhereUniqueInput!
  ){ 
    object:user(
      where:$where
    ){
      ...user
    } 
  }

  ${fragmentUser}
`;


export const signin = gql`
  mutation signin(
    $where: UserWhereUniqueInput!
    $password: String!
  ){
    response:signin(
      where: $where
      password: $password
    ){
      success
      message
      errors{
        key
        message
      }
      token
      data{
        ...user
      }
    }
  }

  ${fragmentUser}
`;

export const signup = gql`
  mutation signup(
    $data: UserCreateInput!
  ){
    response:signup(
      data: $data
    ){
      success
      message
      errors{
        key
        message
      }
      token
      data{
        ...user
      }
    }
  }

  ${fragmentUser}
`;


// export const updateUser = gql`


//   mutation updateUser(
//     $data: UserUpdateInput!
//     # $updateUserWhere: UserWhereUniqueInput!
//   ){
//     updateUser(
//       # id:ID!
//       # where: $updateUserWhere
//       data: $data
//     ){
//       ...user
//     }
//   }


//   ${fragmentUser}

// `;



export const updateUserProcessor = gql`


  mutation updateUserProcessor(
    $data: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ){
    response: updateUserProcessor(
      where: $where
      data: $data
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...user
      }
    }
  }


  ${fragmentUser}

`;


export const createUserProcessor = gql`
  mutation createUserProcessor(
    $data: UserCreateInput!
  ){ 
    response: createUserProcessor(
      data: $data
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...user
      }
    }
  }

  ${fragmentUser}

`;

export const resetPassword = gql`
  mutation resetPassword(
    $where: UserWhereUniqueInput!
  ){ 
    response: resetPassword(
      where: $where
    )
  }
 

`;
