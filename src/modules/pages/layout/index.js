
import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import URI from 'urijs';

export default class PageLayout extends Component {

  static contextTypes = {
    user: PropTypes.object,
    client: PropTypes.object.isRequired,
    uri: PropTypes.object.isRequired,
  }

  static propTypes = {
    setMeta: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    setMeta: true,
  };


  state = {};


  static childContextTypes = {
    setPageMeta: PropTypes.func,
  }


  getChildContext() {

    return {
      setPageMeta: meta => this.setPageMeta(meta),
    };
  }



  setPageMeta(meta = {}) {

    let {
      title,
      description,
      status,
    } = meta;

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