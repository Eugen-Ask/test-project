import { createReducer } from 'redux-act'
import produce from 'immer'

import { changeRepoInput } from './action'

const initialState = {
  repoSearchBarValue: ''
}

export const appReducer = createReducer({
  [changeRepoInput]: produce((state, payload) => {
    state.repoSearchBarValue = payload
  })
}, initialState)
