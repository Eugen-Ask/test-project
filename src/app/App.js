import React from 'react'
import emotion from '@emotion/styled/macro'
import debounce from 'lodash/debounce'

export class App extends React.PureComponent {
  onChange = (e) => {
    this.props.changeRepoInput(e.target.value)
    this.loadRepository()
  }

  loadRepository = debounce(this.props.loadRepository, 500)
  
  render() {
    const { app, loading } = this.props
    return (
      <div>
        <RepoSearchBarInput
          value={app.repoSearchBarValue}
          onChange={this.onChange}
        />
        <div>
          { app.assignees.data.map(assignee =>
            <Assignee
              key={assignee.id}
              assignee={assignee}
            />
          )}
        </div>
        <div>
          { app.issues.data.map(issue =>
            <Issue
              key={issue.id}
              issue={issue}
            />
          )}
        </div>
        { loading.loadRepository &&
          <Loader/>
        }
      </div>
    )
  }
}

export const RepoSearchBarInput = emotion.input`
  
`

export const Assignee = emotion.div`
  
`

export const Issue = emotion.div`
  
`

export const Loader = emotion.div`
  
`
