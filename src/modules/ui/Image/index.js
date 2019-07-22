import React, { Component } from 'react'
import PropTypes from 'prop-types'


export const getImageUrl = (src, type = "thumb") => {

  if (!src || !type) {
    return null;
  }

  return `/images/${type}/${src}`;

}


export class Image extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }


  static defaultProps = {
    type: 'thumb',
  };


  render() {

    let {
      type,
      src,
      ...other
    } = this.props;

    src = getImageUrl(src, type);

    return (
      <img
        src={src}
        {...other}
      />
    )
  }
}


export default Image;