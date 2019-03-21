import '../../testing/setupTestingEnvironment'
import React from 'react'
import { mount } from 'enzyme'

import { App, Assignee, Issue, Loader, LoadMoreAssignees, RepoSearchBarInput } from '../App'
import { initialState } from '../reducer'

describe('App', () => {
  let props 
  let wrapper
  
  beforeEach(() => {
    props = {
      app: initialState,
      changeRepoInput: jest.fn(),
      loadRepository: jest.fn(),
      loadIssues: jest.fn(),
      loadAssignees: jest.fn(),
      loading: {}
    }
    render()
  })
  
  afterEach(() => {
    jest.restoreAllMocks()
    jest.advanceTimersByTime(0)
  })
  
  it('renders without crashing', () => {})
  
  it('calls "changeRepoInput" when changing repo input', () => {
    changeInput($repoInput(), 'facebook/react')
    expect(props.changeRepoInput).toHaveBeenCalledWith('facebook/react')
  })

  it ('calls "loadRepository" on 500 ms after last change of repo input', () => {
    changeInput($repoInput(), 'facebook/react')

    expect(props.loadRepository).not.toHaveBeenCalled()

    jest.advanceTimersByTime(499)
    expect(props.loadRepository).not.toHaveBeenCalled()

    jest.advanceTimersByTime(500)
    expect(props.loadRepository).toHaveBeenCalled()
  })

  it('shows assignees if loaded', async () => {
    props.app.assignees.data = [{ id: 1 }, { id: 2 }, { id: 3 }]
    render()
    expect(wrapper.find(Assignee).length).toBe(3)
  })

  it('shows issues if loaded', async () => {
    props.app.issues.data = [{ id: 1 }, { id: 2 }, { id: 3 }]
    render()
    expect(wrapper.find(Issue).length).toBe(3)
  })

  it('does not show loader if nothing is loading', async () => {
    expect(wrapper.find(Loader).exists()).toBe(false)
  })
  
  it('shows loader if repository is loading', async () => {
    props.loading.loadRepository = true
    render()
    expect(wrapper.find(Loader).exists()).toBe(true)
  })

  it('shows loader if more issues are loading', async () => {
    props.loading.loadIssues = true
    render()
    expect(wrapper.find(Loader).exists()).toBe(true)
  })

  it('calls loadAssignees when clicking on the button "load more assignees"', () => {
    wrapper.find(LoadMoreAssignees).simulate('click')
    expect(props.loadAssignees).toHaveBeenCalled()
  })

  function render() {
    wrapper = mount(<App {...props}/>)
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
