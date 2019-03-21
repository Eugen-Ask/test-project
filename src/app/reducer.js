import { createReducer } from 'redux-act'
import produce from 'immer'

import { assigneesHasLoaded, changeRepoInput, clearLoadedData, issuesHasLoaded } from './action'

export const initialState = {
  repoSearchBarValue: '',
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
  [clearLoadedData]: produce((state) => {
    state.assignees = initialState.assignees
    state.issues = initialState.issues
  }),
}, initialState)
