
import React, {Component} from 'react';

import PropTypes from 'prop-types';

import PageLayout from '../layout';

import Typography from 'material-ui/Typography';

export default class PageNotFound extends PageLayout{


  render(){

    return super.render(<Typography
      variant="title"
      style={{
        textAlign: "center",
        margin: "50px 0",
      }}
    >
      Page not found
    </Typography>)
  }
}