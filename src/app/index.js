import { compose } from 'redux'
import { connect } from 'react-redux'

import { App as AppComponent } from './App'
import {
  changeRepoInput,
  changeAssigneeSearchInput,
  selectAssignee,
  loadRepository,
  loadAssignees,
  loadIssues, 
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
  loadAssignees,
  loadIssues,
  clearIssues,
  clearAssignees,
}

const enhance = compose(
  connect(mapStateToProps, actions),
  withActionLoadingIndicators(props => ({ 
    loadRepository: props.loadRepository,
    loadIssues: props.loadIssues,
  })),
)

export const App = enhance(AppComponent)
