import '../../testing/setupTestingEnvironment'
import React from 'react'
import { mount } from 'enzyme'
import produce from 'immer'
import IntersectionObserver from '@researchgate/react-intersection-observer'

import { App } from '../App'
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
  
  describe('SearchBar', () => {
    describe('RepoInput', () => {
      it('calls "changeRepoInput" when changed', () => {
        const input = wrapper.find('SearchBar RepoInputWrapper Input')
        changeInput(input, 'facebook/react')
        expect(props.changeRepoInput).toHaveBeenCalledWith('facebook/react')
      })
    
      it ('calls "loadRepository" on 1000 ms after the last change', () => {
        const input = wrapper.find('SearchBar RepoInputWrapper Input')
        changeInput(input, 'facebook/react')
    
        expect(props.loadRepository).not.toHaveBeenCalled()
    
        jest.advanceTimersByTime(999)
        expect(props.loadRepository).not.toHaveBeenCalled()
    
        jest.advanceTimersByTime(1000)
        expect(props.loadRepository).toHaveBeenCalled()
      })
    })

    describe('AssigneeInput', () => {
      it("filters assignees by their name", () => {
        render(props => {
          props.app.assigneeSearchInputValue = 'g'
          props.app.assignees.data = getFakeAssignees()
        })
        expect(wrapper.find('Assignee').length).toBe(1)
      })
  
      it("does not filter assignees if filter is empty", () => {
        render(props => {
          props.app.assigneeSearchInputValue = ''
          props.app.assignees.data = getFakeAssignees()
        })
        expect(wrapper.find('Assignee').length).toBe(3)
      })
    })
  })

  describe('Assignees', () => {
    it('shows assignees if loaded', async () => {
      render(props => {
        props.app.assignees.data = getFakeAssignees()
      })
      expect(wrapper.find('Assignee').length).toBe(3)
    })
    
    describe('LoadMoreButton', () => {
      it('calls loadAssignees when clicking on the button "load more assignees"', () => {
        render(props => {
          props.app.assignees = {
            data: getFakeAssignees(),
            lastLoadedPage: 1,
            totalPages: 2,
          }
        })
        wrapper.find('Assignees LoadMoreButton').simulate('click')
        expect(props.loadAssignees).toHaveBeenCalled()
      })
      
      it('does not show LoadMoreAssignees button if no assignees loaded', () => {
        expect(wrapper.find('Assignees LoadMoreButton').exists()).toBe(false)
      })
      
      it('shows LoadMoreButton if something but not everything is loaded', () => {
        render(props => {
          props.app.assignees = {
            data: getFakeAssignees(),
            lastLoadedPage: 1,
            totalPages: 2,
          }
        })
        expect(wrapper.find('Assignees LoadMoreButton').exists()).toBe(true)
      })

      it('does not show LoadMoreButton button all the assignees loaded', () => {
        render(props => {
          props.app.assignees = {
            data: getFakeAssignees(),
            lastLoadedPage: 2,
            totalPages: 2,
          }
        })
        expect(wrapper.find('Assignees LoadMoreButton').exists()).toBe(false)
      })
    })
  })
  
  describe('Issues', () => {
    it('shows issues if loaded', async () => {
      render(props => {
        props.app.issues.data = getFakeIssues()
      })
      expect(wrapper.find('Issue').length).toBe(3)
    })

    describe('IntersectionObserver', () => {
      it("is hidden if nothing is still loaded", () => {
        render(props => {
          props.app.issues.data = []
        })
        expect(wrapper.find('IntersectionObserver').exists()).toBe(false)
      })
  
      it("is shown if something but not everything is loaded", () => {
        render(props => {
          props.app.issues = {
            data: getFakeIssues(),
            lastLoadedPage: 1,
            totalPages: 2,
          }
        })
        expect(wrapper.find('IntersectionObserver').exists()).toBe(true)
      })

      it('is hidden if something but not everything is loaded', () => {
        render(props => {
          props.app.assignees = {
            data: getFakeAssignees(),
            lastLoadedPage: 2,
            totalPages: 2,
          }
        })
        expect(wrapper.find('IntersectionObserver').exists()).toBe(false)
      })
  
      it("is hidden if issues loading is in progress", () => {
        render(props => {
          props.app.issues = {
            data: getFakeIssues(),
            lastLoadedPage: 1,
            totalPages: 2,
          }
          props.loading.loadIssues = true
        })
        expect(wrapper.find('IntersectionObserver').exists()).toBe(false)
      })
  
      it("is hidden if repository loading is in progress", () => {
        render(props => {
          props.app.issues = {
            data: getFakeIssues(),
            lastLoadedPage: 1,
            totalPages: 2,
          }
          props.loading.loadRepository = true
        })
        expect(wrapper.find('IntersectionObserver').exists()).toBe(false)
      })
    });

    describe('Loader', () => {
      it('is hidden if nothing is loading', async () => {
        expect(wrapper.find('Issues Loader').exists()).toBe(false)
      })

      it('is shown if repository is loading', async () => {
        render(props => {
          props.loading.loadRepository = true
        })
        expect(wrapper.find('Issues Loader').exists()).toBe(true)
      })

      it('is shown if more issues are loading', async () => {
        render(props => {
          props.loading.loadIssues = true
        })
        expect(wrapper.find('Issues Loader').exists()).toBe(true)
      })
    });
  })  

  function render(producer = _ => _) {
    props = produce(props, producer)
    wrapper = mount(<App {...props}/>)
  }
})

function getFakeAssignees() { 
  return [
    { id: 1, login: 'achao' },
    { id: 2, login: 'gaearon' },
    { id: 3, login: 'yungsters' },
  ]
}

function getFakeIssues() {
  return [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]
}

function changeInput(inputWrapper, value) {
  inputWrapper.simulate('change', { target: { value } })
}

