import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Snackbar, { SnackbarContent } from "material-ui/Snackbar";

export default class Errors extends Component {

  static propTypes = {
    errors: PropTypes.array.isRequired,
  }

  render() {

    const {
      errors,
    } = this.props;

    return (
      errors && errors.map((error, index) => {
        
        const {
          message,
        } = error;
        
        return (
          <Snackbar
            key={index}
            open={true}
            anchorOrigin={{
              horizontal: "center",
              vertical: "top",
            }}
            message={message}
          >
          </Snackbar>

        )

      }) || null
    )
  }
}
