import { connect } from 'react-redux'

import { App as AppComponent } from './App'
import { changeRepoInput, loadRepository } from './action'

export function mapStateToProps(state) { 
  return { app: state.app }
}

export const actions = {
  changeRepoInput,
  loadRepository,
}

export const App = connect(mapStateToProps, actions)(AppComponent)
