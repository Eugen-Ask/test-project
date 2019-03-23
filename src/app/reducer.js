import { createReducer } from 'redux-act'
import produce from 'immer'

import {
  assigneesHasLoaded,
  changeAssigneeSearchInput,
  selectAssignee,
  changeRepoInput,
  clearIssues,
  clearAssignees,
  issuesHasLoaded,
  issuesLoadingFailed,
} from './action'

export const initialState = {
  repoSearchBarValue: '',
  assigneeSearchInputValue: '',
  loadingError: '',
  currentAssignee: undefined,
  assignees: {
    data: [],
    lastLoadedPage: undefined,
    totalPages: undefined,
  },
  issues: {
    data: [],
    lastLoadedPage: undefined,
    totalPages: undefined,
  }
}

export const appReducer = createReducer({
  [changeRepoInput]: produce((state, payload) => {
    state.repoSearchBarValue = payload
  }),
  [changeAssigneeSearchInput]: produce((state, payload) => {
    state.assigneeSearchInputValue = payload
  }),
  [assigneesHasLoaded]: produce((state, payload) => {
    const { data, currentPage, totalPages } = payload
    state.assignees.data.push(...data)
    state.assignees.lastLoadedPage = currentPage
    state.assignees.totalPages = totalPages
  }),
  [issuesHasLoaded]: produce((state, payload) => {
    const { data, currentPage, totalPages } = payload
    state.issues.data.push(...data)
    state.issues.lastLoadedPage = currentPage
    state.issues.totalPages = totalPages
  }),
  [clearIssues]: produce((state) => {
    state.issues = initialState.issues
    state.loadingError = initialState.loadingError
  }),
  [clearAssignees]: produce((state) => {
    state.assignees = initialState.assignees
    state.assigneeSearchInputValue = initialState.assigneeSearchInputValue
  }),
  [issuesLoadingFailed]: produce((state, payload) => {
    state.assignees.data = []
    state.loadingError = payload
  }),
  [selectAssignee]: produce((state, assignee) => {
    state.currentAssignee = assignee
  }),
}, initialState)
