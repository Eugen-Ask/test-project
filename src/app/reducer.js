import { createReducer } from 'redux-act'
import produce from 'immer'

import { assigneesHasLoaded, changeRepoInput } from './action'

const initialState = {
  repoSearchBarValue: '',
  assignees: {
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
}, initialState)
