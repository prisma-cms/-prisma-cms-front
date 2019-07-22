import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ScrollerProvider extends Component {

  // static propTypes = {
  //   prop: PropTypes
  // }

  static propTypes = {
    location: PropTypes.object.isRequired,
  }


  componentDidUpdate(prevProps, prevState){

    if(prevProps.location && this.props.location && prevProps.location !== this.props.location){
      window.scrollTo(0, 0)
    }

  }

  render() {
    
    const {
      children: {
        type: Type,
        props,
      },
    } = this.props;

    return <Type 
      {...props}
    />

  }
}

export default class Scroller extends Component {


  static contextTypes = {
    router: PropTypes.object.isRequired,
  }


  render() {
    

    const {
      router,
    } = this.context;

    return <ScrollerProvider 
      location={router.route.location}
      {...this.props}
    />

  }
}
