import React from 'react'
import emotion from '@emotion/styled/macro'
import IntersectionObserver from '@researchgate/react-intersection-observer'

import { SearchBar } from './SearchBar'

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
        { app.loadingError &&
          <Error>
            { app.loadingError }
          </Error>
        }
        <div>
          { this.assignees.map(assignee =>
            <Assignee
              key={assignee.id}
              assignee={assignee}
            >
              { assignee.login }
            </Assignee>
          )}
          { app.assignees.data.length > 0 &&
            app.assignees.lastLoadedPage < app.assignees.totalPages &&
            <LoadMoreAssignees onClick={this.props.loadAssignees}>
              <b>More</b>
            </LoadMoreAssignees>
          }
        </div>
        <div>
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

export const Assignee = emotion.div`
  
`

export const LoadMoreAssignees = emotion.div`
  
`

export const Issue = emotion.div`
  
`

export const Loader = emotion.div`
  
`

export const Error = emotion.div`
  color: red;
`
