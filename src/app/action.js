import { createAction } from 'redux-act'

import { requestAssignees } from '../resources/github'

export const changeRepoInput = createAction('App:changeRepoInput')
export const assigneesHasLoaded = createAction('App:assigneesHasLoaded')

export const loadRepository = () => async (dispatch, getState) => {
  const { app } = getState()
  await dispatch(loadAssignees(app.repoSearchBarValue))
}

export const loadAssignees = (ownerAndRepo, page) => async (dispatch, getState) => {
  const response = await requestAssignees(ownerAndRepo, page)
  dispatch(assigneesHasLoaded(response))
}
