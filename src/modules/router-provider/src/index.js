import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import {
  Route,
  Switch,
} from 'react-router-dom'


// const pages = require.context('pages', true)
// const pages = require.context('react-cms-pages', true)


let pages;


pages = require.context("./../../pages/", true, /Page$/)


console.log("pages", pages);
console.log("pages keys", pages.keys());
// console.log("pages()", pages("MainPage"));

// const MainPage = pages("./MainPage");
// console.log("pages module", MainPage);




const routes = gql`
  query routes {
    objects: routes{
      id
      path
      exact
      component
    }
  }
`;

export class RouterProvider extends Component {

  render() {

    const {
      data: {
        objects,
      },
      ...other
    } = this.props;


    if (!objects) {
      return null;
    }


    let routes = objects.map(n => {

      const {
        id,
        path,
        exact,
        component,
        ...other
      } = n;


      return <Route
        key={id}
        path={path}
        exact={exact}
        render={props => {

          console.log("component", component);

          // const Component = require(component);
          // const {default: Component} = require(String(component));
          const { default: Component } = pages(`./${component}`);
          // const { default: Component } = require(pages[`./${component}`]);

          console.log("Component", Component);

          return <Component
            {...props}
          />
        }}
        {...other}
      />

    });

    return <Switch>
      {routes}
    </Switch>

  }
}

export default graphql(routes)(RouterProvider);
