import { compose } from 'redux'
import { connect } from 'react-redux'

import { App as AppComponent } from './App'
import {
  changeRepoInput,
  changeAssigneeSearchInput,
  selectAssignee,
  loadRepository,
  loadMoreAssignees,
  loadMoreIssues, 
  loadIssuesOfAssignee,
  clearIssues, 
  clearAssignees,
} from './action'
import { withActionLoadingIndicators } from '../lib/withActionLoadingIndicators'

export function mapStateToProps(state) { 
  return { app: state.app }
}

export const actions = {
  changeRepoInput,
  changeAssigneeSearchInput,
  selectAssignee,
  loadRepository,
  loadMoreAssignees,
  loadMoreIssues,
  loadIssuesOfAssignee,
  clearIssues,
  clearAssignees,
}

const enhance = compose(
  connect(mapStateToProps, actions),
  withActionLoadingIndicators({
    loadRepository: 'repository',
    loadMoreIssues: 'issues',
    loadMoreAssignees: 'assignees',
    loadIssuesOfAssignee: 'issuesOfAssignee',
  }),
)

export const App = enhance(AppComponent)
