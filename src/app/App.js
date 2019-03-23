import React from 'react'
import emotion from '@emotion/styled/macro'
import IntersectionObserver from '@researchgate/react-intersection-observer'

import { SearchBar } from './SearchBar'
import { Assignees } from './Assignees'
import { Issues } from './Issues'

export class App extends React.PureComponent {
  LoadMoreIssuesTrigger = () => {
    const { app, loading } = this.props
    if (
      app.issues.data.length > 0 
      && app.issues.lastLoadedPage < app.issues.totalPages
      && !loading.loadIssues
      && !loading.loadRepository
    ){
      return (
        <IntersectionObserver
          children={<div/>}
          onChange={({ isIntersecting }) => {
            if (isIntersecting) this.props.loadIssues()
          }}
        />
      )
    }
    return null
  }
  
  get assignees() {
    const { assignees, assigneeSearchInputValue } = this.props.app
    return assignees.data
      .filter(_ =>
        _.login
          .toLowerCase()
          .startsWith(assigneeSearchInputValue.toLowerCase())
      )
  }
  
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
        />
        <Issues
          issues={app.issues}
          loading={this.props.loading}
          loadIssues={this.props.loadIssues}
        />
      </div>
    )
  }
}
