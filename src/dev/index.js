import React, { Component } from 'react';
// import PrismaCmsApp from '@prisma-cms/front'
import MainApp from "../App";
import DevApp from './App'

import DevRenderer from "./Renderer";

import {
  BrowserRouter as Router,
} from 'react-router-dom'

export default class Dev extends Component {

  static defaultProps = {
  }

  render() {

    const {
      ...other
    } = this.props;

    return <Router>
      <DevApp
        App={MainApp}
        Renderer={DevRenderer}
        // pure={true}
        {...other}
      />
    </Router>
  }
}



