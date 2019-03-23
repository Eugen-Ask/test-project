import React from 'react'
import emotion from '@emotion/styled/macro'
import IntersectionObserver from '@researchgate/react-intersection-observer'

import { SearchBar } from './SearchBar'
import { Assignees } from './Assignees'

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
    const { app, loading } = this.props
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
        <div>
          { app.loadingError &&
            <Error>
              { app.loadingError }
            </Error>
          }
          { app.issues.data.map(issue =>
            <Issue
              key={issue.id}
              issue={issue}
            >
              {issue.title}
            </Issue>
          )}
        </div>
        <this.LoadMoreIssuesTrigger/>
        { (loading.loadRepository || loading.loadIssues) &&
          <Loader>Loading</Loader>
        }
      </div>
    )
  }
}

export const Issue = emotion.div`
  
`

export const Loader = emotion.div`
  
`

export const Error = emotion.div`
  color: red;
`
