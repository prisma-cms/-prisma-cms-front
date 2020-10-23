import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';

import '../styles/less/styles.less';

import App from '../components/App';

import DevRenderer from "./Renderer";

export default class DevApp extends Component {

  static defaultProps = {
    Renderer: DevRenderer,
    App,
  }


  render() {

    const {
      App,
      ...other
    } = this.props;

    return <App
      {...other}
    />
  }

}