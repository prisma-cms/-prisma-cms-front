
import expect from 'expect'

import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";


import TestApp from "../App";

import Uploader from '../../src/modules/Uploader'

class Renderer extends Component {

  static propTypes = {
  }

  render() {

    return <div
      id="content"
      {...this.props}
    />

  }
}


describe('Render ui Uploaders', () => {
  let node


  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })



  it('Render MultiUploader', () => {
    render(<TestApp
      lang="ru"
      Renderer={Renderer}
    >
      <Uploader
        multiple={true}
        id="uploader"
      />
    </TestApp>, node, () => {

      const input = node.querySelector("#uploader");

      // console.log("Uploader node", node);
      // console.log("Uploader input", input);

      if (!input) {
        throw new Error("Input not found");
      }

      const multiple = input.getAttribute("multiple");

      expect('').toContain(multiple)
    })
  });


  it('Render SingleUploader', () => {
    render(<TestApp
      lang="ru"
      Renderer={Renderer}
    >
      <Uploader
        id="uploader"
      />
    </TestApp>, node, () => {

      const input = node.querySelector("#uploader");

      if (!input) {
        throw new Error("Input not found");
      }

      const multiple = input.getAttribute("multiple");

      expect(multiple).toBe(null);

      // expect('').toContain(multiple)
    })
  });



})
