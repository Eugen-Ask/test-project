import '../../testing/setupTestingEnvironment'
import React from 'react'
import { mount } from 'enzyme'
import produce from 'immer'

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
    render(_ => {
      _.app.assignees.data = [{ id: 1 }, { id: 2 }, { id: 3 }]
    })
    expect(wrapper.find(Assignee).length).toBe(3)
  })

  it('shows issues if loaded', async () => {
    render(_ => {
      _.app.issues.data = [{ id: 1 }, { id: 2 }, { id: 3 }]
    })
    expect(wrapper.find(Issue).length).toBe(3)
  })

  it('does not show loader if nothing is loading', async () => {
    expect(wrapper.find(Loader).exists()).toBe(false)
  })
  
  it('shows loader if repository is loading', async () => {
    render(_ => {
      _.loading.loadRepository = true
    })
    expect(wrapper.find(Loader).exists()).toBe(true)
  })

  it('shows loader if more issues are loading', async () => {
    render(_ => {
      _.loading.loadIssues = true
    })
    expect(wrapper.find(Loader).exists()).toBe(true)
  })

  it('calls loadAssignees when clicking on the button "load more assignees"', () => {
    render(_ => {
      _.app.assignees = {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }],
        lastLoadedPage: 1,
        totalPages: 2,
      }
    })
    wrapper.find(LoadMoreAssignees).simulate('click')
    expect(props.loadAssignees).toHaveBeenCalled()
  })

  it('does not show LoadMoreAssignees button if no assignees loaded', () => {
    expect(wrapper.find(LoadMoreAssignees).exists()).toBe(false)
  })

  it('shows LoadMoreAssignees button if not all data is loaded', () => {
    render(_ => {
      _.app.assignees = {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }],
        lastLoadedPage: 1,
        totalPages: 2,
      }
    })
    expect(wrapper.find(LoadMoreAssignees).exists()).toBe(true)
  })

  function render(producer = _ => _) {
    props = produce(props, producer)
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
