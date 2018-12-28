

import expect from 'expect'

import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import TestApp from "../App";
import chalk from 'chalk';


import Errors from "../../components/App/Renderer/Errors";



class Renderer extends Component {


  render() {

    return <div
      className="test-content"
      {...this.props}
    />

  }
}

describe('Render errors', () => {

  let node

  node = document.createElement('div')


  it('', () => {

    let message = "GraphQL error: Test Error";

    let error = {
      message,
    }

    let errors = [error]

    render(<TestApp
      Renderer={Renderer}
    >
      <Errors
        errors={errors}
      />
    </TestApp>, node, () => {




      let div = node.querySelector(".test-content");




      expect(div.textContent).toBe("Test Error");

    })

  })
})