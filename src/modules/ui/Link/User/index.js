import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Link from '../';

const propTypes = Object.assign({...Link.propTypes}, {
  username: PropTypes.string.isRequired,
});


export default class UserLink extends Link {
 

  getUrl(){

    const {
      username,
    } = this.props;

    return `/profile/${username}/`;
  }

}
