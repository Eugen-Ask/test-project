import React from 'react'
import mapValues from 'lodash/mapValues'

export function withActionLoadingIndicators(actions) {
  return (Component) => 
    class ActionLoadingIndicatorsProvider extends React.Component {
      state = { }
  
      getDecoratedActions() {
        if (this.getDecoratedActions.cache) {
          return this.getDecoratedActions.cache
        }
        const decoratedActions = mapValues(actions(this.props), (theAction, actionName) =>
          async (...args) => {
            this.setState({ [actionName]: true })
            try {
              return await theAction(...args)
            }
            finally {
              this.setState({ [actionName]: false })
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
