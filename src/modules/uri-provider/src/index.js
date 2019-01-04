import React, { Component } from 'react'
import PropTypes from 'prop-types'

import URI from "urijs";

import Context from "@prisma-cms/context";

export default class UriProvider extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }


  static childContextTypes = {
    uri: PropTypes.object,
  };


  getChildContext() {
    const {
      router: {
        history,
      },
    } = this.context;

    const {
      location,
    } = history;

    let uri = new URI(history.createHref(location));

    return {
      uri,
    }

  }


  render() {

    const {
      children,
    } = this.props;

    return <Context.Consumer>
      {context => <Context.Provider
        value={Object.assign(context, {
          ...this.getChildContext(),
        })}
      >
        {children || null}
      </Context.Provider>}
    </Context.Consumer>

    // return null;

    // const {
    //   children: {
    //     type: Type,
    //     props,
    //   },
    // } = this.props;

    // return <Type
    //   {...props}
    // />

  }
}

