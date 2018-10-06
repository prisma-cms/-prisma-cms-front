


import './styles/less/styles.css';

// import 'babel-polyfill';

import React, { Component } from 'react'
import ReactDOM from 'react-dom'


import PropTypes from "prop-types";

import ApolloCMS from 'apollo-cms/es/App';

import App from './components/App';


import {
  BrowserRouter as Router,
} from 'react-router-dom'


const {
  protocol,
  // hostname,
  host,
} = window.location;


export default class PrismaCmsApp extends Component {

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



// ReactDOM.render(

//   <PrismaCmsApp /> 
//   ,
//   document.getElementById('root'),
// )
