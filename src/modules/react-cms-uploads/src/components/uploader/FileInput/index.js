
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class FileInput extends PureComponent{

  render(){

    return <input
      type="file"
      {...this.props}
    />

  }

}
