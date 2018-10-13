

import expect from 'expect'

import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import TestApp from "../App";
import chalk from 'chalk';

// import jsdom from 'jsdom';

// const { JSDOM } = jsdom;


// const w = (new JSDOM(`<!DOCTYPE html>`)).window;

// const {
//   // document,
//   HTMLElement,
//   HTMLAnchorElement,
//   HTMLImageElement,
// } = w;

// // // global.document = document;
// global.HTMLElement = HTMLElement;
// global.HTMLAnchorElement = HTMLAnchorElement;
// global.HTMLImageElement = HTMLImageElement;

// global.Range = function Range() {};

// const createContextualFragment = (html) => {
//   const div = document.createElement('div');
//   div.innerHTML = html;
//   return div.children[0]; // so hokey it's not even funny
// };

// Range.prototype.createContextualFragment = (html) => createContextualFragment(html);

// // HACK: Polyfil that allows codemirror to render in a JSDOM env.
// global.window.document.createRange = function createRange() {
//   return {
//     setEnd: () => {},
//     setStart: () => {},
//     getBoundingClientRect: () => {
//       return { right: 0 };
//     },
//     getClientRects: () => [],
//     createContextualFragment,
//   };
// };


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


// // export  default new Promise (re => {

// //   re();
// // })

// // export default () => {


// //   console.log("Asdasdsad");
// //   return new Promise(re => {

// //     re();
// //   })
// // }


// async function* generator(items) {

//   console.log(chalk.green("generator(items)"), items);

//   while(items && items.length){

//     const item = items.splice(0, 1)[0];

//     let result;

//     console.log(chalk.green("item"), item);

//     yield result;

//   }

// }

// async function test() {

//   const tasks = generator.call(this, [{}, {}]);

//   console.log(chalk.green("tasks"), tasks);

//   for await (const n of tasks) {

//   }

//   console.log(chalk.green("tasks 2", tasks));

// }


// describe("Testttt", () => {

//   it("Tess", () => {

//     // test([{}, {}]);

//     return new Promise(async resolve => {

//       console.log(chalk.green("sdgsdgds"));

//       await test();

//       console.log(chalk.green("resolved"));

//       resolve();

//     });

//   })

// });



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



    // setTimeout(() => {

    //   console.log(chalk.green("loop test start end"), new Date());

    //   resolve("SDfdsf");

    // }, 3000);

  })

};


let rules = [
  // {
  //   name: "Main page",
  //   pathname: "/",
  //   title: "Main page",
  // },
  {
    name: "Users page",
    pathname: "/users/",
    title: "Users",
  },
  // {
  //   name: "Page not found",
  //   pathname: "/404/",
  //   title: "Page not found",
  //   status: 404,
  // },
  // {
  //   name: "Page not found",
  //   pathname: "/404/",
  //   // title: "Page not found",
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