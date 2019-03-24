import React from 'react'
import mapValues from 'lodash/mapValues'
import memoize from 'lodash/memoize'

export function withActionLoadingIndicators(actions) {
  return (Component) => 
    class WithActionLoadingIndicators extends React.Component {
      state = { }
  
      getDecoratedActions = memoize(() => mapValues(
        actions,
        (indicatorName, actionName) => async (...args) => {
          this.setState({[indicatorName]: true})
          try {
            return await this.props[actionName](...args)
          } finally {
            this.setState({[indicatorName]: false})
          }
        }
      ))
  
      render () {
        return (
          <Component
            {...this.props}
            {...this.getDecoratedActions()}
            loading={this.state}
          />
        )
      }
    }
}
