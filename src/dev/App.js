import React, { Component } from 'react';
import PropTypes from "prop-types";

import PrismaCmsApp from '../App'

import * as queryFragments from "../schema/generated/api.fragments";

export default class App extends Component {

  static propTypes = {
    queryFragments: PropTypes.object.isRequired,
  }
  
  static defaultProps = {
    queryFragments,
    lang: "ru",
  }

  render() {

    const {
      queryFragments,
      ...other
    } = this.props;

    return <PrismaCmsApp
      queryFragments={queryFragments}
      {...other}
    />
  }
}

