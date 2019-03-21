import { createAction } from 'redux-act'

import { requestAssignees, requestIssues } from '../resources/github'

export const changeRepoInput = createAction('App:changeRepoInput')
export const changeAssigneeSearchInput = createAction('App:changeAssigneeSearchInput')
export const assigneesHasLoaded = createAction('App:assigneesHasLoaded')
export const issuesHasLoaded = createAction('App:issuesHasLoaded')
export const clearLoadedData = createAction('App:clearLoadedData')

export const loadRepository = () => async (dispatch, getState) => {
  const { app } = getState()
  dispatch(clearLoadedData())
  dispatch(loadAssignees(app.repoSearchBarValue))
  return await dispatch(loadIssues(app.repoSearchBarValue))
}

export const loadAssignees = () => async (dispatch, getState) => {
  const { repoSearchBarValue, assignees: { lastLoadedPage = 0 } } = getState().app
  const response = await requestAssignees(repoSearchBarValue, lastLoadedPage + 1)
  dispatch(assigneesHasLoaded(response))
}

export const loadIssues = () => async (dispatch, getState) => {
  const { repoSearchBarValue, issues: { lastLoadedPage = 0 } } = getState().app
  const response = await requestIssues(repoSearchBarValue, undefined, lastLoadedPage + 1)
  dispatch(issuesHasLoaded(response))
}
