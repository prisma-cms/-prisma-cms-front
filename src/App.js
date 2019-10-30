

// import './styles/less/styles.css';

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

import URI from "urijs";

const uri = new URI();

const endpoint = `${uri.origin()}/api/`;


class PrismaCmsApp extends Component {

  static propTypes = {
    App: PropTypes.func.isRequired,
    endpoint: PropTypes.string.isRequired,
  }


  static defaultProps = {
    App,
    endpoint,
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

        // const {
        //   protocol,
        //   // hostname,
        //   host,
        // } = global.location || {};

        // endpoint = `${protocol}//${host}/api/`;

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


const loader = function () {

  return new Promise((resolve, reject) => {


    const {
      __APOLLO_STATE_ID__,
    } = global;



    setTimeout(() => {

      fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          query: `  {
            schemaSDL: apiSchema
          }
        `,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(r => r.json())
        .then(({
          data: {
            schemaSDL,
          },
        }) => {

          // console.log("schemaSDL", schemaSDL);

          global.__PRISMA_CMS_API_SCHEMA_DSL__ = schemaSDL;

          // global.__APOLLO_STATE__ = state;

          // render();


          // if (__APOLLO_STATE_ID__ && base_path === "__apollo-state__" && apollo_state_id) {
          if (__APOLLO_STATE_ID__) {


            setTimeout(() => {

              fetch(`/__apollo-state__/${__APOLLO_STATE_ID__}`, {
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then(r => r.json())
                .then(state => {

                  // console.log("state", state);

                  global.__APOLLO_STATE__ = state;

                  resolve();

                  return;
                })
                .catch(reject)

            }, 200);


          }
          else {
            resolve();
          }


          return;
        })
        .catch(reject)

    }, 200);


  });

}

export {
  endpoint,
  loader,
  App,
  Renderer,
  PrismaCmsApp,
  PageNotFound,
  // FrontEditor,
}

export default PrismaCmsApp
