import '../../testing/setupTestingEnvironment'
import React from 'react'
import { mount } from 'enzyme'
import produce from 'immer'
import IntersectionObserver from '@researchgate/react-intersection-observer'

import { App, Assignee, Issue, Loader, LoadMoreAssignees, RepoSearchBarInput } from '../App'
import { initialState } from '../reducer'

jest.mock('@researchgate/react-intersection-observer')

IntersectionObserver.mockImplementation(
  function({ onChange }) {
    onChange({ isIntersecting: true })
    return null
  }
)

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
    render(props => {
      props.app.assignees.data = [{ id: 1 }, { id: 2 }, { id: 3 }]
    })
    expect(wrapper.find(Assignee).length).toBe(3)
  })

  it('shows issues if loaded', async () => {
    render(props => {
      props.app.issues.data = [{ id: 1 }, { id: 2 }, { id: 3 }]
    })
    expect(wrapper.find(Issue).length).toBe(3)
  })

  it('does not show loader if nothing is loading', async () => {
    expect(wrapper.find(Loader).exists()).toBe(false)
  })
  
  it('shows loader if repository is loading', async () => {
    render(props => {
      props.loading.loadRepository = true
    })
    expect(wrapper.find(Loader).exists()).toBe(true)
  })

  it('shows loader if more issues are loading', async () => {
    render(props => {
      props.loading.loadIssues = true
    })
    expect(wrapper.find(Loader).exists()).toBe(true)
  })

  it('calls loadAssignees when clicking on the button "load more assignees"', () => {
    render(props => {
      props.app.assignees = {
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
    render(props => {
      props.app.assignees = {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }],
        lastLoadedPage: 1,
        totalPages: 2,
      }
    })
    expect(wrapper.find(LoadMoreAssignees).exists()).toBe(true)
  })

  it("does not trigger 'loadIssues' if issues if data still not loaded", () => {
    expect(props.loadIssues).not.toHaveBeenCalled()
  })
  
  it("triggers 'loadIssues' if not everything is loaded", () => {
    render(props => {
      props.app.issues = {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }],
        lastLoadedPage: 1,
        totalPages: 2,
      }
    })
    expect(props.loadIssues).toHaveBeenCalled()
  })

  it("does not trigger 'loadIssues' if everything is loaded", () => {
    render(props => {
      props.app.issues = {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }],
        lastLoadedPage: 2,
        totalPages: 2,
      }
    })
    expect(props.loadIssues).not.toHaveBeenCalled()
  })
  
  it("does not trigger 'loadIssues' if more issues are loading", () => {
    render(props => {
      props.app.issues = {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }],
        lastLoadedPage: 1,
        totalPages: 2,
      }
      props.loading.loadIssues = true
    })
    expect(props.loadIssues).not.toHaveBeenCalled()
  })
  
  it("does not trigger 'loadIssues' if repository is loading", () => {
    render(props => {
      props.app.issues = {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }],
        lastLoadedPage: 1,
        totalPages: 2,
      }
      props.loading.loadRepository = true
    })
    expect(props.loadIssues).not.toHaveBeenCalled()
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

