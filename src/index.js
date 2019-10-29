
import ReactDOM from 'react-dom'
import React from 'react'

import Dev from "./dev";

import * as serviceWorker from './serviceWorker';

// import "moment/locale/ru";

// import * as queryFragments from "./schema/generated/api.fragments";

const node = document.getElementById('root');

if (node) {
  ReactDOM.render(<Dev
  // queryFragments={queryFragments}
  // lang="en"
  />, node);

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

