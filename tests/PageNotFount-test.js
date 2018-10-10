

import expect from 'expect'
import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import TestApp from "./App";

import {
  PageNotFount,
} from "../src/App";


const customTitle = "Custom title";

class Renderer extends Component {

  render() {

    return <PageNotFount />;
  }
}



class RendererCustomTitle extends Component {

  render() {

    return <PageNotFount
      title={customTitle}
    />;
  }
}


describe('@prisma-cms/connector', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })


  it('Page not found default title and status', () => {
    render(<TestApp
      Renderer={Renderer}
      lang="ru"
    />, node, () => {

      // console.log("@prisma-cms/connector result node", node.innerHTML);
      // console.log("getQueryFragment result node.textContent", node.textContent);

      const {
        title,
        status,
      } = global.document;

      // console.log("title", title);
      // console.log("status", status);

      expect("404").toContain(status.toString());
      expect("Page not found").toContain(title.toString(title));

      // return true;
    })
  });


  it('Page not found custom title', () => {
    render(<TestApp
      Renderer={RendererCustomTitle}
      lang="ru"
    />, node, () => {

      // console.log("@prisma-cms/connector result node", node.innerHTML);
      // console.log("getQueryFragment result node.textContent", node.textContent);

      const {
        title,
        status,
      } = global.document;

      // console.log("title", title);
      // console.log("status", status);

      expect("404").toContain(status.toString());
      expect(customTitle).toContain(title);

      // return true;
    })
  });


})


