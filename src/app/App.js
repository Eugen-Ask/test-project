import React from 'react'

import { SearchBar } from './SearchBar'
import { Assignees } from './Assignees'
import { Issues } from './Issues'

export class App extends React.PureComponent {
  render() {
    const { app } = this.props
    return (
      <div>
        <SearchBar
          repoSearchBarValue={app.repoSearchBarValue}
          changeRepoInput={this.props.changeRepoInput}
          loadRepository={this.props.loadRepository}
          assigneeInputValue={app.assigneeSearchInputValue}
          changeAssigneeSearchInput={this.props.changeAssigneeSearchInput}
        />
        <Assignees
          assignees={app.assignees}
          assigneeSearchInputValue={app.assigneeSearchInputValue}
          loadAssignees={this.props.loadAssignees}
          currentAssignee={app.currentAssignee}
          loadIssuesOfAssignee={this.props.loadIssuesOfAssignee}
          loading={this.props.loading}
        />
        <Issues
          issues={app.issues}
          loadingError={app.loadingError}
          loading={this.props.loading}
          loadIssues={this.props.loadIssues}
        />
      </div>
    )
  }
}
