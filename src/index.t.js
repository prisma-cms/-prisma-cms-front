

import expect from 'expect'

import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import TestApp from "../App";
import chalk from 'chalk';



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



describe('Front page', async () => {
  let node


  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

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
    {
      name: "Page not found",
      pathname: "/404/",
      title: "Page not found",
      status: 404,
    },
  ]


  // return new Promise(async(resolveTest => {

  console.log(chalk.green("My test 11111111111"));




  // let test = async (rule) => {

  //   const {
  //     name,
  //     pathname,
  //     title,
  //     status = 200,
  //   } = rule;

  //   console.log(chalk.green("test rule"), rule);

  //   return new Promise((resolve) => {

  //     it(name, () => {


  //       Object.assign(global.document, {
  //         status: undefined,
  //         title: "",
  //       });

  //       render(<Renderer
  //         pathname={pathname}
  //       >
  //       </Renderer>, node, () => {

  //         /**
  //          * setTimeout - hack for sync loading
  //          */
  //         setTimeout(() => {
  //           const {
  //             document: {
  //               title: currentTitle,
  //               status: currentStatus,
  //             },
  //             window: {
  //               location: {
  //                 pathname: currentPathname,
  //               },
  //             },
  //           } = global;


  //           // console.log("document status", global.document);

  //           expect(currentPathname).toEqual(pathname);

  //           title && expect(currentTitle).toEqual(title);

  //           expect(currentStatus).toBe(status);

  //           resolve();

  //         }, 300);

  //       })
  //     });

  //   });

  // }

  // const queues = async function* (rules) {

  //   while (rules.length) {

  //     const rule = rules.splice(0, 1)[0];

  //     const result = await test(rule);

  //     yield result;

  //   }
  // }


  // const tasks = queues(rules);

  // for await (const n of tasks) {

  //   console.log(chalk.green("n result"), n);

  // }
  // for await (const task of tasks) {
  //   // обрабатываем её
  //   // console.log(task)
  // }




  async function parsePageContent(links) {


    console.log(chalk.green("My test 44444 links"), links);

    /**
     * Обрабатываем все внутренние ссылки
     */
    if (links) {


      async function* queues() {

        let i = 0;

        console.log("links.length", links.length, i);

        while (i < links.length) {

          const result = "dsfds";

          yield result;
        }

      }

      // обработчик задач из очереди
      // получаем итератор по задачам
      const tasks = queues.call(this)

      console.log(chalk.green("My test 55555 tasks"), tasks);

      // дожидаемся каждую задачу из очереди
      for await (const task of tasks) {
        // обрабатываем её
        console.log("task", task)

      }


      it('Render App', () => {

        expect("App").toBe(null);

      });

      console.log(chalk.green("My test 66666666 tasks"));

      // console.log("Queue ended");

      return;

    }


  }



  // it('Render App', () => {

  //   // expect(App).toNotBe(null);

  //   parsePageContent(rules);

  // });

  // console.log("Sdfsdfdsf");

  // }));


  console.log(chalk.green("My test 22222222"));

  return new Promise(async resolveTest => {

    console.log(chalk.green("My test 333333333"));

    await parsePageContent(rules);

    resolveTest();

  })

})


async function parsePageContent(links) {


  console.log(chalk.green("My test 888888 links"), links);

  /**
   * Обрабатываем все внутренние ссылки
   */
  if (links) {


    async function* queues() {

      let i = 0;

      console.log("links.length", links.length, i);

      while (i < links.length) {

        const result = "dsfds";

        yield result;
      }

    }

    // обработчик задач из очереди
    // получаем итератор по задачам
    const tasks = queues.call(this)

    console.log(chalk.green("My test 9999999 tasks"), tasks);

    // дожидаемся каждую задачу из очереди
    // for await (const task of stasks) {
    //   // обрабатываем её
    //   console.log("task", task)

    //   // console.log(chalk.green("My test 123123123123 tasks"), tasks);

    //   // describe('Front page', async () => {

    //   //   it('Render App', () => {

    //   //     expect("App").toBe(null);

    //   //   });

    //   // });

    // }



    console.log(chalk.green("My test 00000000 tasks"));

    // console.log("Queue ended");
 

  }


}

parsePageContent([
  {}, {},
]);

