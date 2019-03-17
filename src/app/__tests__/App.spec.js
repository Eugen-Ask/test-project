import '../../system/setupEnzyme'
import React from 'react'
import { mount } from 'enzyme'

import { App } from '../App'

describe('App', () => {
  let component
  let props = {  }
  
  it('renders without crashing', () => {
    render()
  })
  
  function render() {
    component = mount(<App {...props}/>)
  }
})

