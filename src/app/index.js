import { compose } from 'redux'
import { connect } from 'react-redux'

import { App as AppComponent } from './App'
import { changeRepoInput, loadRepository } from './action'
import { withActionLoadingIndicators } from '../lib/withActionLoadingIndicators'

export function mapStateToProps(state) { 
  return { app: state.app }
}

export const actions = {
  changeRepoInput,
  loadRepository,
}

const enhance = compose(
  connect(mapStateToProps, actions),
  withActionLoadingIndicators(props => ({ loadRepository: props.loadRepository })),
)

export const App = enhance(AppComponent)
