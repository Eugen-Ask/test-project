import { connect } from 'react-redux'

import { App as AppComponent } from './App'
import { changeRepoInput } from './action'

export function mapStateToProps(state) { 
  return { app: state.app }
}

export const actions = {
  changeRepoInput,
}

export const App = connect(mapStateToProps, actions)(AppComponent)
