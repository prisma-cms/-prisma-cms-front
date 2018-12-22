
import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";

import URI from 'urijs';

export default class PageLayout extends PrismaCmsComponent {

  static contextTypes = {
    ...PrismaCmsComponent.contextTypes,
    user: PropTypes.object,
    client: PropTypes.object.isRequired,
    uri: PropTypes.object.isRequired,
  }

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    setMeta: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    setMeta: true,
  };


  static childContextTypes = {
    ...PrismaCmsComponent.childContextTypes,
    setPageMeta: PropTypes.func,
  }


  getChildContext() {

    let context = super.getChildContext ? super.getChildContext() : {};

    return {
      ...context,
      setPageMeta: meta => this.setPageMeta(meta),
    };
  }



  setPageMeta(meta) {

    let {
      title,
      description,
      status = 200,
    } = meta || {};

    // console.log("setPageMeta meta", meta);

    if (!global.document) {
      global.document = {}
    }

    let {
      document,
    } = global;


    if (title) {

      if (document.title !== title) {
        document.title = title;
      }

    }

    Object.assign(document, {
      status,
    });

  }


  componentWillMount() {

    const {
      setMeta,
    } = this.props;

    if (setMeta) {
      this.setPageMeta();
    }

    super.componentWillMount && super.componentWillMount();
  }


  componentDidUpdate(prevProps, prevState) {

    const {
      setMeta,
    } = this.props;

    if (setMeta) {
      this.setPageMeta();
    }

    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
  }



  onChange(event) {

    const {
      name,
      value,
    } = event.target;

    this.setState({
      [name]: value,
    });

  }



  getPage() {

    const page = this.getUriParam("page");

    return page ? parseInt(page) : 1;
  }

  getUriParam(param) {

    const uri = this.getUri();

    // console.log("uri", uri);

    const query = uri.query(true);

    // console.log("query", query);

    return query ? query[param] : null;

  }

  getUri() {

    const {
      // history: {
      // },
      location,
    } = this.props;

    const {
      pathname,
      search,
    } = location;

    let uri = new URI(pathname);

    uri.query(search);

    // console.log("location", location);

    return uri;
  }


  render(content) {

    // const output = content || null

    if (!content) {
      return null;
    }

    const {
    } = this.props;


    return content;

  }
}