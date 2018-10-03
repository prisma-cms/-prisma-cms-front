import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Input extends Component{

  static propTypes = {
    // prop: PropTypes
  }

  static defaultProps = {
  };

  render() {

    const {
      className,
      ...other
    } = this.props;

    return (
      <input
        {...other}
        className={["border-box", className].join(" ")}
      />
    )
  }
}
