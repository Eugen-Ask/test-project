import React from 'react'
import emotion from '@emotion/styled/macro'
import { keyframes } from '@emotion/core'
import { colors } from '../../../ui/theme'

export function LoadingPlaceholder() { 
  return (
    <Placeholder>
      <GlimpseAnimation/>
      <BadgeMd/>
      <BadgeSm/>
      <BadgeLg/>
      <BadgeMd/>
      <BadgeSm/>
      <BadgeLg/>
      <BadgeMd/>
      <BadgeSm/>
      <BadgeLg/>
    </Placeholder>
  )
}


const Placeholder = emotion.div`
  height: 24px;
  position: relative;
  width: 100%;
  display: flex;
  padding-bottom: 10px;
`

const scrollingLeftAnimation = keyframes`
  0% { background-position: 100% 0%; }
  100% { background-position: 0% 0%; }
`

const GlimpseAnimation = emotion.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  background: linear-gradient(
    to right,
    white 0%,
    transparent 5%,
    transparent 45%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 55%,
    transparent 95%,
    white 100%
  );
  background-size: 200% 100%;
  
  animation: ${scrollingLeftAnimation} 1000ms linear infinite;
`

const Badge = emotion.div`
  border-radius: 12px;
  margin: 0 5px;
  height: 24px;
  background-color: ${colors.greyLighter};
`

const BadgeSm = emotion(Badge)`
  flex: 2;
`

const BadgeMd = emotion(Badge)`
  flex: 3;
`

const BadgeLg = emotion(Badge)`
  flex: 4;
`
