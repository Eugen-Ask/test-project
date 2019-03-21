import { createAction } from 'redux-act'

import { requestAssignees, requestIssues } from '../resources/github'

export const changeRepoInput = createAction('App:changeRepoInput')
export const assigneesHasLoaded = createAction('App:assigneesHasLoaded')
export const issuesHasLoaded = createAction('App:issuesHasLoaded')

export const loadRepository = () => async (dispatch, getState) => {
  const { app } = getState()
  return await Promise.all([
    dispatch(loadAssignees(app.repoSearchBarValue)),
    dispatch(loadIssues(app.repoSearchBarValue)),
  ])
}

export const loadAssignees = (ownerAndRepo) => async (dispatch, getState) => {
  const { lastLoadedPage = 0 } = getState().app.assignees
  const response = await requestAssignees(ownerAndRepo, lastLoadedPage + 1)
  dispatch(assigneesHasLoaded(response))
}

export const loadIssues = (ownerAndRepo, assignee) => async (dispatch, getState) => {
  const { lastLoadedPage = 0 } = getState().app.issues
  const response = await requestIssues(ownerAndRepo, assignee, lastLoadedPage + 1)
  dispatch(issuesHasLoaded(response))
}
