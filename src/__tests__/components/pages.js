

import expect from 'expect'

import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import TestApp from "../App";
import chalk from 'chalk';

import createDOM from "../utils/createDOM";

createDOM();
 

class Renderer extends Component {

  static propTypes = {
    pathname: PropTypes.string.isRequired,
    title: PropTypes.string,
  }

  constructor(props) {

    super(props);

    const {
      pathname,
      title = "",
    } = props;

    window.history.pushState({}, title, pathname);

  }

  render() {

    return <TestApp
      {...this.props}
    />

  }
}

 


let test = (rule) => {

  return new Promise(resolve => {

    let node

    node = document.createElement('div')


    console.log(chalk.green("loop test start"));


    const {
      name,
      pathname,
      title,
      status = 200,
    } = rule;

    console.log(chalk.green("test rule"), rule);




    Object.assign(global.document, {
      status: undefined,
      title: "",
    });

    render(<Renderer
      pathname={pathname}
    >
    </Renderer>, node, () => {

      /**
       * setTimeout - hack for sync loading
       */
      setTimeout(() => {

        const {
          document: {
            title: currentTitle,
            status: currentStatus,
          },
          window: {
            location: {
              pathname: currentPathname,
            },
          },
        } = global;


        // console.log("document status", global.document);

        expect(currentPathname).toEqual(pathname);

        if (title) {
          title && expect(currentTitle).toEqual(title);
        }

        if (status) {
          expect(currentStatus).toBe(status);
        }

        resolve();

      }, 1000);

    })

 

  })

};


let rules = [
  {
    name: "Main page",
    pathname: "/",
    title: "Main page",
  },
  {
    name: "Users page",
    pathname: "/users/",
    title: "Users",
  },
  // {
  //   name: "User page",
  //   pathname: "/users/cjn29andg08zb0950gba9l3yo",
  //   title: "test",
  // },
  // {
  //   name: "User page not found",
  //   pathname: "/users/404",
  //   title: "Page not found",
  //   status: 404,
  // },
  // {
  //   name: "Page not found",
  //   pathname: "/404/",
  //   title: "Page not found",
  //   status: 404,
  // },
]


describe('Pages test', () => {
  // first way
  for (let i in rules) {

    const rule = rules[i];

    console.log(chalk.green("Got test"), new Date());

    const {
      name,
    } = rule;

    it(name, () => {
      // expect("...").toBe("...")

      return test(rule);
    })
  }
  // second way
  // tests.forEach((test) => {
  //     it('...', () => {
  //         expect("...").toBe("...")
  //     })
  // })
})