import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Component from 'src/'

describe('Component', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('Test main App', () => {
    render(<Component
      endpoint="http://localhost/"
    />, node, () => {
      // expect(node.innerHTML).toContain('wefd')
      return true;
    })
  })
})
