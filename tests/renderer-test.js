 

import expect from 'expect'
import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import TestApp, { queryFragments } from "./App";

import {Renderer as BaseRenderer} from "../src/App";
 


class Renderer extends BaseRenderer {


  getRoutes(){

    let routers = super.getRoutes();

    routers.push({
      path: "test",
    });

    return routers;
  }


 
  render(){

    const routers = this.getRoutes(); 

    return routers.find(n => n.path === "test") ? "OK" : "Error";
  }
 

}


describe('Override routers', () => {
  let node


  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Check routers are overridable', () => {
    render(<TestApp
      Renderer={Renderer}
    />, node, () => {

      console.log("Override routers result node", node.innerHTML);

      expect(node.textContent).toBe("OK")
    })
  })
})


