


import './styles/less/styles.css';

import React, { Component } from 'react'
import ReactDOM from 'react-dom'


import PropTypes from "prop-types";

import ApolloCMS from 'apollo-cms/lib/App';

import App from './components/App';

import Renderer from "./components/App/Renderer";

import {
  BrowserRouter as Router,
} from 'react-router-dom'


const {
  protocol,
  // hostname,
  host,
} = global.location || {};

class PrismaCmsApp extends Component {

  static propTypes = {
    App: PropTypes.func.isRequired,
  }


  static defaultProps = {
    App,
  };


  render() {

    const {
      App,
      apolloOptions,
      ...other
    } = this.props;

    return <Router>
      <ApolloCMS
        endpoint={`${protocol}//${host}/api/`}
        apiQuery={`{
        user:me{
          id
          username
          fullname
          sudo
          image
        }
      }`}
        {...apolloOptions}
      >
        <App
          {...other}
        />
      </ApolloCMS>
    </Router>
  }
}

export {
  App,
  Renderer,
  PrismaCmsApp,
}

export default PrismaCmsApp
