// @flow

import React from 'react';
import PropTypes from 'prop-types';

export default class ObjectView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    data: PropTypes.object.isRequired,
    // saveObject: PropTypes.func,
    // mutate: PropTypes.func.isRequired,
    // refetch: PropTypes.func.isRequired,
  }
  
  
  static contextTypes = {
    user: PropTypes.object,
    client: PropTypes.object.isRequired,
  }


  canEdit(){

    const object = this.getObjectWithMutations();

    if(!object){
      return false;
    }

    
    const currentUser = this.getCurrentUser();


    const {
      id,
    } = object;


    const canEdit = currentUser && currentUser.id === id ? true : false;

    return canEdit;

  }


  getCurrentUser(){

    const {
      user: currentUser,
    } = this.context;

    return currentUser;

  }


  render() {
    return null;
  }
}
