

import expect from 'expect'
import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import TestApp from "./App";

import {
  PageNotFound,
} from "../src/App";


const customTitle = "Custom title";

class Renderer extends Component {

  render() {

    return <PageNotFound />;
  }
}



class RendererCustomTitle extends Component {

  render() {

    return <PageNotFound
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

      expect("404").toBe(status.toString());
      expect("Page not found").toBe(title.toString(title));

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

      expect("404").toBe(status.toString());
      expect(customTitle).toBe(title);

      // return true;
    })
  });


})


