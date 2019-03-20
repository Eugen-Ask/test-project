import '../../system/setupTestingEnvironment'
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
  
  afterEach(() => {
    jest.restoreAllMocks()
    jest.advanceTimersByTime(0)
  })
  
  it('renders without crashing', () => {})
  
  it ('changes repo search bar', () => {
    changeInput($repoInput(), 'facebook/react')
    expect(getValue($repoInput())).toBe('facebook/react')
  })

  it ('loads repository data on 500 ms after last change of RepoSearchBarInput', () => {
    const loadRepository = jest.spyOn(actions, 'loadRepository')
    render({ loadRepository })
    
    changeInput($repoInput(), 'facebook/react')
    
    expect(loadRepository).not.toHaveBeenCalled()

    jest.advanceTimersByTime(499)
    expect(loadRepository).not.toHaveBeenCalled()
    
    jest.advanceTimersByTime(500)
    expect(loadRepository).toHaveBeenCalled()
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
