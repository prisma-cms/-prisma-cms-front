
import './styles/less/styles.css';

import React, { Component } from 'react'

import PropTypes from "prop-types";

import Context from "@prisma-cms/context";

import ApolloCMS from 'apollo-cms/lib/App';

import App from './components/App';

import { Renderer } from "./components/App/Renderer";

import PageNotFound from "./modules/pages/404";

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
      queryFragments,
    } = this.props;


    this.state = {
      ...this.state,
      context: {
        queryFragments,
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

    const {
      queryFragments,
    } = other;

    const {
      context,
    } = this.state;

    const {
      UserNoNestingFragment,
    } = queryFragments;

    return <Router>
      <ApolloCMS
        endpoint={`${protocol}//${host}/api/`}
        apiQuery={`{
          user:me{
            ...UserNoNesting
          }
        }
        ${UserNoNestingFragment}
      `}
        {...apolloOptions}
      >
        <Context.Provider
          value={context}
        >
          <App
            {...other}
          />
        </Context.Provider>
      </ApolloCMS>
    </Router>
  }
}

export {
  App,
  Renderer,
  PrismaCmsApp,
  PageNotFound,
}

export default PrismaCmsApp
