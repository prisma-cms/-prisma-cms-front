

import './styles/less/styles.css';

import React, { Component } from 'react'

import PropTypes from "prop-types";

// import Apollo from 'apollo-cms/lib/App';
import Apollo from "./components/Apollo";

// import FrontEditor from './components/FrontEditor';

import App from './components/App';

import { Renderer } from "./components/App/Renderer";

import PageNotFound from "./components/pages/404";

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


  constructor(props) {

    super(props);

    const {
      // queryFragments,
    } = this.props;


    this.state = {
      ...this.state,
      context: {
        // queryFragments,
        query: {},
      },
    }
  }

  render() {

    const {
      App,
      apolloOptions,
      ...other
    } = this.props;

    // const {
    //   queryFragments,
    // } = other;

    // const {
    //   UserNoNestingFragment,
    // } = queryFragments;

    const endpoint = `${protocol}//${host}/api/`;

    return <Router>
      <Apollo
        endpoint={endpoint}
        apiQuery={`{
          user:me{
            id
            username
            email
            phone
            showEmail
            showPhone
            sudo
            hasEmail
            hasPhone
          }
        }
      `}
        {...apolloOptions}
      >
        <App
          {...other}
        />
      </Apollo>
    </Router>
  }
}

export {
  App,
  Renderer,
  PrismaCmsApp,
  PageNotFound,
  // FrontEditor,
}

export default PrismaCmsApp
