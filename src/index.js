import 'normalize.css'
import 'intersection-observer'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import * as serviceWorker from './system/serviceWorker'
import { createStore } from './system/store'
import { App } from './app'

const app = (
  <Provider store={createStore()}>
    <App/>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
