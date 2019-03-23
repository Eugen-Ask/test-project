import React from 'react'
import emotion from '@emotion/styled/macro'

import { colors } from '../ui/theme'

export class Assignees extends React.PureComponent {
  get assignees() {
    const { assignees, assigneeSearchInputValue } = this.props
    return assignees.data.filter(
      _ => _.login
        .toLowerCase()
        .startsWith(assigneeSearchInputValue.toLowerCase())
    )
  }
  
  render() {
    if (!this.props.assignees.data.length) return null
    
    return (
      <Self>
        <ClearButton
          isActive={this.props.selectedAssignee === undefined}
          onClick={() => this.props.setAssignee(undefined)}
        >
          <div/>
          <Text>
            Not assigned
          </Text>
        </ClearButton>
        { this.assignees.map(assignee => (
          <Assignee
            key={assignee.login}
            isActive={this.props.selectedAssignee === assignee.login}
            onClick={() => this.props.setAssignee(assignee.login)}
          >
            <UserPic src={assignee.avatar_url}/>
            <Text>
              {assignee.login}
            </Text>
          </Assignee>
        ))}
        { this.props.assignees.data.length > 0 && 
          this.props.assignees.lastLoadedPage < this.props.assignees.totalPages &&
          <LoadMoreButton onClick={this.props.loadAssignees}>
            <div/>
            <Text>
              <b>More</b>
            </Text>
          </LoadMoreButton>
        }
      </Self>
    )
  }
}

const Self = emotion.div`
  padding: 0 5px;
  &:empty {
    padding: 0;
  }
`

const Item = emotion.div`
  border-radius: 12px;
  font-family: Roboto, sans-serif;
  margin: 0 5px 10px 5px;
  font-size: 12px;
  line-height: 24px;
  height: 24px;
  display: inline-flex;
  cursor: pointer;
  border: 1px solid ${colors.greyLight};
  background-color: ${_ => _.isActive ? colors.blueLight : ''}
`

const ClearButton = emotion(Item)``

const Assignee = emotion(Item)``

const LoadMoreButton = emotion(Item)``

const Text = emotion.div`
  padding: 0 10px;
  color: ${colors.textPrimary};
`

const UserPic = emotion.img`
  height: 24px;
  width: 24px;
  border-radius: 50%;
`
