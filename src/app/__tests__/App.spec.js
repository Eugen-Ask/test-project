import '../../system/setupEnzyme'
import React from 'react'
import { mount } from 'enzyme'
import { connect, Provider } from 'react-redux'

import { mapStateToProps, actions } from '../'
import { App, RepoSearchBarInput } from '../App'
import { createStore } from '../../system/store'

describe('App', () => {
  let store
  let wrapper
  
  beforeEach(() => {
    store = createStore()
    render()
  })
  
  it('renders without crashing', () => {})
  
  it ('changes repo search bar', () => {
    changeInput($repoInput(), 'facebook/react')
    expect(getValue($repoInput())).toBe('facebook/react')
  })
  
  function render(changedActions = {}) {
    const ConnectedApp = connect(
      mapStateToProps, 
      { ...actions, ...changedActions }
    )(App)
    wrapper = mount(
      <Provider store={store}>
        <ConnectedApp/>
      </Provider>
    )
  }
  
  function $repoInput() {
    return wrapper.find(RepoSearchBarInput)
  }
})


function getValue(inputWrapper) { 
  return inputWrapper.props().value
}

function changeInput(inputWrapper, value) {
  inputWrapper.simulate('change', { target: { value } })
}
