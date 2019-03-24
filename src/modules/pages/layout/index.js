
import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';

import PrismaCmsComponent from "@prisma-cms/component";
import Context from "@prisma-cms/context";

import URI from 'urijs';

export default class PageLayout extends PrismaCmsComponent {

  static contextType = Context;

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    setMeta: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    ...PrismaCmsComponent.defaultProps,
    setMeta: true,
  };


  // static childContextTypes = {
  //   ...PrismaCmsComponent.childContextTypes,
  //   setPageMeta: PropTypes.func,
  // }


  // getChildContext() {

  //   let context = super.getChildContext ? super.getChildContext() : {};

  //   return {
  //     ...context,
  //     setPageMeta: meta => this.setPageMeta(meta),
  //   };
  // }



  setPageMeta(meta) {

    let {
      title,
      status = 200,
      ...other
    } = meta || {};



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
      ...other,
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



    const query = uri.query(true);



    return query ? query[param] : null;

  }


  getUri() {

    // const {
    //   // history: {
    //   // },
    //   location,
    // } = this.props;

    // const {
    //   pathname,
    //   search,
    // } = location;

    // let uri = new URI(pathname);

    // uri.query(search);



    // return uri;

    const {
      uri,
    } = this.context;

    return uri;
  }



  getPaginationParams() {

    const {
      first,
    } = this.props;


    const page = this.getPage();

    const skip = page > 1 && first > 0 ? (page - 1) * first : undefined;

    return {
      page,
      skip,
      first,
    }
  }


  getFilters() {

    const {
      uri,
    } = this.context;


    let {
      page,
      ...filters
    } = uri.query(true);

    // let {
    //   status_in,
    // } = uri.query(true);

    // if(status_in && !Array.isArray(status_in)){
    //   status_in = [status_in];
    // }



    // let filters = {
    //   status_in,
    // };

    return filters;
  }


  setFilters(filters) {


    const {
      uri,
      router: {
        history,
      },
    } = this.context;

    let newUri = uri.clone();

    let query = newUri.query(true);

    Object.assign(query, {
      ...filters,
    });

    newUri.query(query);

    history.push(newUri.toString());
  }


  render(content) {

    // const output = content || null

    if (!content) {
      return null;
    }


    return <Context.Consumer>
      {context => <Context.Provider
        value={Object.assign(context, {
          setPageMeta: meta => this.setPageMeta(meta),
        })}
      >
        {content}
      </Context.Provider>}
    </Context.Consumer>;

  }
}