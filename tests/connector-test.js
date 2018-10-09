

import expect from 'expect'
import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import PropTypes from "prop-types";

import TestApp from "./App";

import PrismaCmsConnector from "@prisma-cms/connector";

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';


class Test extends Component{

  render(){

    return "OK";
  }
}


class TestComponent extends PrismaCmsConnector {


  prepareQuery() {

    const {
      getQueryFragment,
    } = this.context;

    const UserNoNestingFragment = getQueryFragment("UserNoNestingFragment");

    const user = gql`
      query user(
        $where:UserWhereUniqueInput!
      ){ 
        object:user(
          where:$where
        ){
          ...UserNoNesting
        } 
      }

      ${UserNoNestingFragment}
    `;

    return compose(
      graphql(user, {
        // name: 'user', 
      }),
    )(Test)
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


  it('Mount', () => {
    render(<TestApp
      Renderer={TestComponent}
      lang="ru"
      where={{
        id: "test",
      }}
    />, node, () => {

      console.log("@prisma-cms/connector result node", node.innerHTML);
      // console.log("getQueryFragment result node.textContent", node.textContent);

      expect(node.textContent).toContain("OK")
    })
  });
 

})


