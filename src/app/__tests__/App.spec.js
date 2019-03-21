import '../../testing/setupTestingEnvironment'
import React from 'react'
import { mount } from 'enzyme'
import { compose } from 'redux'
import { connect, Provider } from 'react-redux'

import { mapStateToProps, actions } from '../'
import { App, Assignee, Issue, RepoSearchBarInput } from '../App'
import { createStore } from '../../system/store'
import { withActionLoadingIndicators } from '../../lib/withActionLoadingIndicators'

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

  it('shows loaded assignees', async () => {
    store.dispatch(actions.changeRepoInput('facebook/react'))
    await store.dispatch(actions.loadRepository())
    wrapper.update()
    expect(wrapper.find(Assignee).length).toBe(30)
  })

  it('shows loaded issues', async () => {
    store.dispatch(actions.changeRepoInput('facebook/react'))
    await store.dispatch(actions.loadRepository())
    wrapper.update()
    expect(wrapper.find(Issue).length).toBe(30)
  })
  
  function render(changedActions = {}) {
    const enhance = compose(
      connect(mapStateToProps, { ...actions, ...changedActions }),
      withActionLoadingIndicators(props => ({ loadRepository: props.loadRepository })),
    )
    const ConnectedApp = enhance(App)
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
