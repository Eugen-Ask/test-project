import React from 'react'
import emotion from '@emotion/styled/macro'
import debounce from 'lodash/debounce'
import IntersectionObserver from '@researchgate/react-intersection-observer'

export class App extends React.PureComponent {
  onChangeRepoSearchBar = (e) => {
    this.props.changeRepoInput(e.target.value)
    this.loadRepository()
  }

  onChangeSearchAssigneeInput = (e) => {
    this.props.changeAssigneeSearchInput(e.target.value)
  }

  loadRepository = debounce(this.props.loadRepository, 500)

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
  
  render() {
    const { app, loading } = this.props
    return (
      <div>
        <RepoSearchBarInput
          value={app.repoSearchBarValue}
          onChange={this.onChangeRepoSearchBar}
        />
        <SearchAssigneesInput
          value={app.assigneeSearchInputValue}
          onChange={this.onChangeSearchAssigneeInput}
        />
        <div>
          { app.assignees.data.map(assignee =>
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

export const RepoSearchBarInput = emotion.input`
  
`

export const SearchAssigneesInput = emotion.input`
  
`

export const Assignee = emotion.div`
  
`

export const LoadMoreAssignees = emotion.div`
  
`

export const Issue = emotion.div`
  
`

export const Loader = emotion.div`
  
`
