
import ReactDOM from 'react-dom'
import React from 'react'

import App from "./App";

import * as queryFragments from "./schema/generated/api.fragments";

ReactDOM.render(<App
  queryFragments={queryFragments}
  lang="ru"
/>, document.getElementById('root'));
