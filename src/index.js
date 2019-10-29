
import ReactDOM from 'react-dom'
import React from 'react'

import Dev from "./dev";

import * as serviceWorker from './serviceWorker';

// import URI from "urijs";

// import "moment/locale/ru";

// import * as queryFragments from "./schema/generated/api.fragments";

const node = document.getElementById('root');

if (node) {

  // global.__APOLLO_STATE__

  const render = function () {
    ReactDOM.render(<Dev
    // queryFragments={queryFragments}
    // lang="en"
    />, node);
  }

  const {
    __APOLLO_STATE_ID__,
  } = global;



  // const uri = new URI();

  // console.log(uri, "uri");

  // const {
  //   0: base_path,
  //   1: apollo_state_id,
  // } = uri.segment();


  // if (__APOLLO_STATE_ID__ && base_path === "__apollo-state__" && apollo_state_id) {
  if (__APOLLO_STATE_ID__) {

    fetch(`/__apollo-state__/${__APOLLO_STATE_ID__}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(state => {

        // console.log("state", state);

        global.__APOLLO_STATE__ = state;

        render();

        return;
      })
      .catch(console.error)

  }
  else {
    render();
  }



  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

