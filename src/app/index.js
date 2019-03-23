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
  withActionLoadingIndicators(
    props => ({
      loadRepository: { 
        action: props.loadRepository, 
        indicatorName: 'repository' 
      },
      loadMoreIssues: { 
        action: props.loadMoreIssues, 
        indicatorName: 'issues' 
      },
      loadMoreAssignees: { 
        action: props.loadMoreAssignees, 
        indicatorName: 'assignees' 
      },
      loadIssuesOfAssignee: { 
        action: props.loadIssuesOfAssignee, 
        indicatorName: 'issuesOfAssignee' 
      },
    }),
  ),
)

export const App = enhance(AppComponent)
