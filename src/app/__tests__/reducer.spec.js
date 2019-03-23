import produce from 'immer'

import '../../testing/setupTestingEnvironment'

import { appReducer, initialState } from '../reducer'
import {
  assigneesHasLoaded,
  changeAssigneeSearchInput,
  changeRepoInput,
  clearAssignees,
  clearIssues,
  issuesHasLoaded,
  issuesLoadingFailed,
  selectAssignee
} from '../action'

describe('Reducer', () => {
  let state
  
  beforeEach(() => {
    state = initialState
    appReducer()
  })
  
  function dispatch(action) {
    return state = appReducer(state, action)
  }
  
  it("handles 'changeRepoInput'", () => {
    dispatch(changeRepoInput('TEXT'))
    expect(state.repoSearchBarValue).toBe('TEXT')
  })

  it("handles 'changeAssigneeSearchInput'", () => {
    dispatch(changeAssigneeSearchInput('gaearon'))
    expect(state.assigneeSearchInputValue).toBe('gaearon')
  })

  it("handles 'assigneesHasLoaded'", () => {
    state = produce((state) => {
      state.assignees.data = [{}, {}]
      state.loadingError = 'An error occurred'
    })(state)
    
    dispatch(assigneesHasLoaded({
      data: [{}, {}, {}],
      currentPage: 9,
      totalPages: 11,
    }))
    
    expect(state.assignees.data.length).toBe(5)
    expect(state.assignees.lastLoadedPage).toBe(9)
    expect(state.assignees.totalPages).toBe(11)
    expect(state.loadingError).toBe('')
  })
  
  it("handles 'issuesHasLoaded'", () => {
    state = produce((state) => {
      state.issues.data = [{}, {}, {}]
    })(state)

    dispatch(issuesHasLoaded({
      data: [{}, {}, {}, {}],
      currentPage: 19,
      totalPages: 21,
    }))

    expect(state.issues.pristine).toBe(false)
    expect(state.issues.data.length).toBe(7)
    expect(state.issues.lastLoadedPage).toBe(19)
    expect(state.issues.totalPages).toBe(21)
  })
  
  it("handles 'clearIssues'", () => {
    dispatch(clearIssues())
    expect(state.issues).toBe(initialState.issues)
    expect(state.loadingError).toBe(initialState.loadingError)
  })
  
  it("handles 'clearAssignees'", () => {
    dispatch(clearAssignees())
    expect(state.assignees).toBe(initialState.assignees)
    expect(state.assigneeSearchInputValue).toBe(initialState.assigneeSearchInputValue)
    expect(state.currentAssignee).toBe(initialState.currentAssignee)
  })
  
  it("handles 'issuesLoadingFailed'", () => {
    dispatch(issuesLoadingFailed('Issues was not loaded'))
    expect(state.loadingError).toBe('Issues was not loaded')
  })
  
  it("handles 'selectAssignee'", () => {
    dispatch(selectAssignee('gaearon'))
    expect(state.currentAssignee).toBe('gaearon')
  })
})
