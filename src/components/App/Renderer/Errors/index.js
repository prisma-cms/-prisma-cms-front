import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Snackbar from "material-ui/Snackbar";

export default class Errors extends Component {

  static propTypes = {
    errors: PropTypes.array.isRequired,
  }

  render() {

    const {
      errors,
    } = this.props;


    let error = errors && errors[0];

    if(!error){
      return null;
    }

    let {
      message,
    } = error;

    message = message && message.replace(/^GraphQL error: */, '') || message;

    return message
      ?
      <Snackbar
        open={true}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        message={message}
      >
      </Snackbar>
      :
      null;

  }
}
