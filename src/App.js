

import './styles/less/styles.css';

import React, { PureComponent } from 'react'

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


class PrismaCmsApp extends PureComponent {

  static propTypes = {
    App: PropTypes.func.isRequired,
  }


  static defaultProps = {
    App,
  };


  // constructor(props) {

  //   super(props);

  //   const {
  //     // queryFragments,
  //   } = this.props;

  // }

  render() {

    let {
      App,
      apolloOptions,
      endpoint,
      ...other
    } = this.props;

    if (!endpoint) {

      if (apolloOptions && apolloOptions.endpoint) {

        endpoint = apolloOptions.endpoint;

      }
      else {

        const {
          protocol,
          // hostname,
          host,
        } = global.location || {};

        endpoint = `${protocol}//${host}/api/`;

      }

    }

    return <Router>
      <Apollo
        endpoint={endpoint}
        apiQuery={`{
          user:me{
            id
            username
            fullname
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
