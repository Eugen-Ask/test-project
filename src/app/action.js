import { createAction } from 'redux-act'

import { requestAssignees, requestIssues } from '../resources/github'

export const changeRepoInput = createAction('App:changeRepoInput')
export const assigneesHasLoaded = createAction('App:assigneesHasLoaded')
export const issuesHasLoaded = createAction('App:issuesHasLoaded')

export const loadRepository = () => async (dispatch, getState) => {
  const { app } = getState()
  await dispatch(loadAssignees(app.repoSearchBarValue))
  await dispatch(loadIssues(app.repoSearchBarValue))
}

export const loadAssignees = (ownerAndRepo, page) => async (dispatch, getState) => {
  const response = await requestAssignees(ownerAndRepo, page)
  dispatch(assigneesHasLoaded(response))
}

export const loadIssues = (ownerAndRepo, assignee, page) => async (dispatch, getState) => {
  const response = await requestIssues(ownerAndRepo, assignee, page)
  dispatch(issuesHasLoaded(response))
}
