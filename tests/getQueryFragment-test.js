

import expect from 'expect'
import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import TestApp, { queryFragments } from "./App";


const fragmentName = "UserNoNestingFragment";

const {
  [fragmentName]: fragment,
} = queryFragments;


class Renderer extends Component {


  static contextTypes = {
    getQueryFragment: PropTypes.func.isRequired,
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {

    const {
      getQueryFragment,
    } = this.context;

    // console.log("getQueryFragment", getQueryFragment);
    // console.log("getQueryFragment", this.context);

    const UserNoNestingFragment = getQueryFragment("UserNoNestingFragment");


    return UserNoNestingFragment;

  }

}


describe('getQueryFragment', () => {
  let node


  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Check content is not empty', () => {
    render(<TestApp
      Renderer={Renderer}
    />, node, () => {

      // console.log("getQueryFragment result node", node.innerHTML);
      // console.log("getQueryFragment result node.textContent", node.textContent);

      expect(node.textContent).toContain(fragment)
      return true;
    })
  })
})


