import React, { Component } from 'react';
// import PrismaCmsApp from '@prisma-cms/front'
import PrismaCmsApp from '../App'
import DevRenderer from "./Renderer";


export default class DevAppRenderer extends Component {

  static defaultProps = {
  }

  render() {

    const {
      ...other
    } = this.props;

    return <PrismaCmsApp
      Renderer={DevRenderer}
      // pure={true}
      {...other}
    />
  }
}



