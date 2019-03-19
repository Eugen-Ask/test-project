import React from 'react'
import emotion from '@emotion/styled/macro'

export class App extends React.PureComponent {
  onChange = (e) =>
    this.props.changeRepoInput(e.target.value)
  
  render() {
    const { app } = this.props
    return (
      <div>
        <RepoSearchBarInput
          value={app.repoSearchBarValue}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export const RepoSearchBarInput = emotion.input`
  
`
