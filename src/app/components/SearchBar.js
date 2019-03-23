import React from 'react'
import emotion from '@emotion/styled/macro'
import debounce from 'lodash/debounce'

import { colors } from '../../ui/theme'

export class SearchBar extends React.PureComponent {
  render() {
    return (
      <Self>
        <RepoInputWrapper>
          https://github.com/
          <Input
            autoFocus
            value={this.props.repoSearchBarValue}
            onChange={this.onChangeRepoSearchBar}
            placeholder="facebook/react"
          />
        </RepoInputWrapper>
        <AssigneeInputWrapper>
          <Input
            type="search"
            value={this.props.assigneeInputValue}
            onChange={(e) => this.props.changeAssigneeSearchInput(e.target.value)}
            placeholder="Search assignee"
          />
        </AssigneeInputWrapper>
      </Self>
    )
  }

  onChangeRepoSearchBar = (e) => {
    this.props.changeRepoInput(e.target.value)
    this.loadRepository()
  }
  
  loadRepository = debounce(this.props.loadRepository, 1000)
}

const Self = emotion.div`
  padding: 10px;
  display: flex;
`

const GreyBar = emotion.div`
  padding: 0 10px;
  border-radius: 5px;
  background-color: ${colors.greyLighter};
  display: flex;
  align-items: center;
  height: 45px;
  &, * {
    font-family: monospace;
    font-size: 20px;
    color: ${colors.textPrimary};
  }
`

const Input = emotion.input`
  border: none;
  outline: none;
  background-color: transparent;
  flex-grow: 1;
  height: 100%;
  &::placeholder {
    color: #c3c3c3;
  }
`

const RepoInputWrapper = emotion(GreyBar)`
  flex-grow: 2;
`

const AssigneeInputWrapper = emotion(GreyBar)`
  flex-grow: 1;
  margin-left: 10px;
`
