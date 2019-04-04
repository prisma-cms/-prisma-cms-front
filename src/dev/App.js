import React, { Component } from 'react';
import PropTypes from "prop-types";

import PrismaCmsApp from '../App'

import DevRenderer from "./Renderer";

export default class DevApp extends PrismaCmsApp {

  static defaultProps = {
    ...PrismaCmsApp.defaultProps,
    Renderer: DevRenderer,
  };

}
