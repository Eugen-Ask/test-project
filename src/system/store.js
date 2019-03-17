import thunk from 'redux-thunk'
import { createStore as createReduxStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer } from './rootReducer'

export const createStore = () =>
  createReduxStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )
