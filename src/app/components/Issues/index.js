import React from 'react'
import emotion from '@emotion/styled/macro'
import IntersectionObserver from '@researchgate/react-intersection-observer'

import { ReactComponent as LoadingIcon } from '../../../ui/icons/loading.svg'
import { colors } from '../../../ui/theme'
import { Issue } from './Issue'

export class Issues extends React.PureComponent {
  render() {
    return (
      <Self>
        { this.props.loadingError &&
        <OperationResult>
          { this.props.loadingError }
        </OperationResult>
        }
        <this.EmptyState/>
        <List>
          { this.props.issues.data.map(issue =>
            <Issue key={issue.id} issue={issue}/>
          )}
          <this.LoadMoreIssuesTrigger/>
        </List>
        <LoaderWrapper>
          <this.Loader/>
        </LoaderWrapper>
      </Self>
    )
  }

  LoadMoreIssuesTrigger = () => {
    const { issues, loading } = this.props
    if (
      issues.data.length > 0
      && issues.lastLoadedPage < issues.totalPages
      && !loading.issues
      && !loading.repository
    ){
      return (
        <IntersectionObserver
          children={<div/>}
          onChange={({ isIntersecting }) => {
            if (isIntersecting) this.props.loadMoreIssues()
          }}
        />
      )
    }
    return null
  }

  Loader = () => {
    const { loading } = this.props
    if (loading.repository 
      || loading.issues 
      || loading.issuesOfAssignee) {
      return <Loader/>
    }
    return null
  }
  
  EmptyState = () => {
    const { data, pristine } = this.props.issues
    if (pristine || data.length > 0) return null
    return (
      <OperationResult>
        ¯\_(ツ)_/¯
        <br/>
        Nothing here 
      </OperationResult>
    )
  }
}

const Self = emotion.div`
  border-top: 1px solid ${colors.greyLight};
  padding: 40px 20px 0;
`

const List = emotion.div`
  border: 1px solid ${colors.greyLight};
  border-radius: 3px;
  max-width: 1024px;
  margin: 0 auto;
  &:empty {
    display: none;
  }
`

const OperationResult = emotion.div`
  color: #5a5a5a;
  text-align: center;
  font-size: 36px;
  font-family: Roboto, sans-serif;
`

const LoaderWrapper = emotion.div`
  display: flex;
  justify-content: center;
  height: 100px;
  padding-top: 30px;
`

const Loader = emotion(LoadingIcon)`
  stroke: #e0e0e0;
`
