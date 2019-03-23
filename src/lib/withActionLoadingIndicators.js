import React from 'react'
import mapValues from 'lodash/mapValues'

export function withActionLoadingIndicators(actions) {
  return (Component) => 
    class WithActionLoadingIndicators extends React.Component {
      state = { }
  
      getDecoratedActions() {
        if (this.getDecoratedActions.cache) {
          return this.getDecoratedActions.cache
        }
        const decoratedActions = mapValues(
          actions(this.props), 
          ({ action, indicatorName }) => async (...args) => {
            this.setState({ [indicatorName]: true })
            try {
              return await action(...args)
            }
            finally {
              this.setState({ [indicatorName]: false })
            }
          }
        )
        return this.getDecoratedActions.cache = decoratedActions
      }
  
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
