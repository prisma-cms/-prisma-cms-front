import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';

import { Link } from 'react-router-dom';
// import * as generatePath from 'react-router-dom/generatePath';

import URI from 'urijs';



const styles = {
  wrapper: {

  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  active: {
    background: "#ddd",
  },
  control: {

  },
  link: {
    padding: "3px 6px",
    border: "1px solid #ddd",
    marginLeft: 3,
    marginRight: 3,
    textDecoration: "none",
    "&:hover": {
      background: "#dfdfdf",
    },
  },
  // avatar: {
  //   margin: 10,
  //   textDecoration: "none",
  // },
  // smallAvatar: {
  //   width: 30,
  //   height: 30,
  // },
  // bigAvatar: {
  //   width: 120,
  //   height: 120,
  // },
};


export class Pagination extends Component {

  static propTypes = {
    // prop: PropTypes
    classes: PropTypes.object.isRequired,
    limit: PropTypes.number.isRequired,
    // page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    pageVariable: PropTypes.string.isRequired,
  }


  static defaultProps = {
    pageVariable: "page",
  }


  static contextTypes = {
    router: PropTypes.object.isRequired,
  }


  getNewLocation = (page) => {

    // console.log("getNewLocation", page);

    const {
      router,
    } = this.context;

    const {
      pageVariable,
    } = this.props;

    // return '/';

    if (!router) {
      return null;
    }


    const {
      history,
    } = router;


    const {
      location,
    } = history;


    let {
      pathname,
      search,
    } = location;

    // const newHref = `${pathname}`;

    let uri = new URI(`${pathname}${search}`);

    let query = uri.query(true);

    // let search

    // if(page > 1){

    //   search = search + `&page=${page}`;

    // }
    // else{

    // }

    Object.assign(query, {
      [pageVariable]: page > 1 ? page : undefined,
    });

    uri.query(query);

    // console.log("getNewLocation pageVariable", pageVariable);
    // console.log("getNewLocation uri", uri.resource());

    return uri.resource();

    // const newLocation = {
    //   pathname,
    //   search,
    // };

    // const newLocation = uri.toString();

    // // let newLocation = router.createLocation(location);

    // // newLocation.query.page = page > 1 ? page : undefined;

    // // return router.createPath(newLocation);
    // return history.createHref(newLocation);

  }


  getPage() {

    const {
      pageVariable,
    } = this.props;

    const page = this.props[pageVariable];

    return parseInt(page) || 1;
  }


  render() {


    const {
      classes,
    } = this.props;

    let {
      limit,
      total,
    } = this.props;

    const page = this.getPage();

    if (!page || !limit || !total) {
      return null;
    }

    let pages = Math.ceil(total / limit);

    if (pages < 2) {
      return null;
    }


    const {
      row: rowClass,
      wrapper: wrapperClass,
      control: controlClass,
      link: linkClass,
      active: activeClass,
    } = classes


    var rows = [];

    if (page > 1) {

      var href = this.getNewLocation(1);

      var href = this.getNewLocation(page - 1);


      rows.push(<li
        key='page-1-0'
        className={controlClass}
      >
        <Link
          to={href}
          href={href}
          className={linkClass}
        >«</Link>
      </li>);
    }


    var lstr = false;
    var rstr = false;
    for (var i = 1; i <= pages; i++) {
      if (
        (
          page > 2
          && i < page - 1
          && i > 1
        )
        || (
          pages - page > 3
          && i > page + 1
          && i < pages - 1
        )
      ) {
        if (!lstr && i > 1 && i < page) {
          rows.push(<li
            key={i}
            className={controlClass}
          ><span>...</span></li>);
          lstr = true;
        }
        if (!rstr && i > page && i < pages) {
          rows.push(<li
            key={i}
            className={controlClass}
          ><span>...</span></li>);
          rstr = true;
        }
      }
      else {

        var href = this.getNewLocation(i);


        rows.push(<li
          key={i}
          className={controlClass}
        >
          <Link
            to={href}
            href={href}
            className={[linkClass, i === page ? activeClass : null].join(" ")}
          >{i}</Link>
        </li>);
      }
    }
    if (page < pages) {

      var href = this.getNewLocation(page + 1);

      rows.push(<li
        key={'page-' + pages + '-0'}
        className={controlClass}
      >
        <Link
          to={href}
          href={href}
          className={linkClass}
        >»</Link>
      </li>);

    }


    return (
      <div className={[wrapperClass, "Pagination--root"].join(" ")}>
        <ul
          className={rowClass}
        >
          {rows}
        </ul>
      </div>
    )
  }
}

export default withStyles(styles)(props => <Pagination
  {...props}
/>);