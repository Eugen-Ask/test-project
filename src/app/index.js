import { connect } from 'react-redux'

import { App as AppComponent } from './App'

export const App = connect(
  (state) => ({ app: state.app }),
  {
    
  }
)(AppComponent)
