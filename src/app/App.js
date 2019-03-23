import React from 'react'

import { SearchBar } from './SearchBar'
import { Assignees } from './Assignees'
import { Issues } from './Issues'

export class App extends React.PureComponent {
  render() {
    return (
      <div>
        <SearchBar
          repoSearchBarValue={this.props.app.repoSearchBarValue}
          changeRepoInput={this.props.changeRepoInput}
          loadRepository={this.props.loadRepository}
          assigneeInputValue={this.props.app.assigneeSearchInputValue}
          changeAssigneeSearchInput={this.props.changeAssigneeSearchInput}
        />
        <Assignees
          assignees={this.props.app.assignees}
          assigneeSearchInputValue={this.props.app.assigneeSearchInputValue}
          loadMoreAssignees={this.props.loadMoreAssignees}
          currentAssignee={this.props.app.currentAssignee}
          loadIssuesOfAssignee={this.props.loadIssuesOfAssignee}
          loading={this.props.loading}
        />
        <Issues
          issues={this.props.app.issues}
          loadingError={this.props.app.loadingError}
          loading={this.props.loading}
          loadIssues={this.props.loadIssues}
        />
      </div>
    )
  }
}
