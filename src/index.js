
import ReactDOM from 'react-dom'
import React from 'react'

import App from "./dev";

// import "moment/locale/ru";

// import * as queryFragments from "./schema/generated/api.fragments";

const node = document.getElementById('root');

if (node) {
  ReactDOM.render(<App
  // queryFragments={queryFragments}
  // lang="en"
  />, node);
}

