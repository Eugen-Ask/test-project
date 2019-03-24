import React from 'react'
import TimeAgo from 'react-timeago'
import emotion from '@emotion/styled/macro'

import { colors } from '../../../ui/theme'
import { ReactComponent as IssueIcon } from '../../../ui/icons/issue.svg'

export class Issue extends React.PureComponent {
  render() {
    const { issue } = this.props
    return (
      <Self>
        <IconWrapper>
          <IssueIcon/>
        </IconWrapper>
        <div>
          <Title href={issue.html_url} target="_blank">
            {issue.title}
          </Title>
          <Time>
            Opened <TimeAgo date={issue.created_at} />
          </Time>
        </div>
      </Self>
    )
  }
}


const Self = emotion.div`
  padding: 15px;
  display: flex;
  font-family: 'Roboto', sans-serif;
  &:not(:first-child) {
    border-top: 1px solid ${colors.greyLight};
  }
`

const IconWrapper = emotion.div`
  padding-right: 10px;
`

const Title = emotion.a`
  color: ${colors.textPrimary};
  text-decoration: none !important;
  font-weight: 700;
`

const Time = emotion.div`
  font-size: 12px;
  color: #586069;
  padding-top: 5px;
`
