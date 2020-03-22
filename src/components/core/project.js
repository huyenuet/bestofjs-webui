import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import slugify from 'slugify'

import { StarIcon } from './icons'

export const DownloadCount = ({ value }) => {
  if (value === undefined) {
    return <div className="star-delta text-secondary text-small">N/A</div>
  }

  return <span>{numeral(value).format('a')}</span>
}

const getSign = value => {
  if (value === 0) return ''
  return value > 0 ? '+' : '-'
}

const StarDeltaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StarDelta = ({ average, ...props }) =>
  average ? <StarDeltaAverage {...props} /> : <StarDeltaNormal {...props} />

const StarDeltaNormal = ({ value }) => {
  const sign = getSign(value)
  return (
    <StarDeltaContainer>
      {value === 0 ? (
        '='
      ) : (
        <>
          <span style={{ marginRight: 2 }}>{sign}</span>
          <span>{Math.abs(value)}</span>
          <StarIcon />
        </>
      )}
    </StarDeltaContainer>
  )
}

const StarDeltaAverageContainer = styled.div`
  text-align: center;
`

export const StarDeltaAverage = ({ value }) => {
  const integerPart = Math.abs(Math.trunc(value))
  const decimalPart = (Math.abs(value - integerPart) * 10).toFixed().slice(0, 1)
  const sign = getSign(value)

  if (value === undefined)
    return <div className="star-delta text-secondary text-small">N/A</div>

  return (
    <StarDeltaAverageContainer>
      <StarDeltaContainer>
        <span style={{ marginRight: 2 }}>{sign}</span>
        <span>{integerPart}</span>
        <span className="text-smallX">.{decimalPart}</span>
      </StarDeltaContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <StarIcon />
        <div className="text-small"> by day</div>
      </div>
    </StarDeltaAverageContainer>
  )
}

export const StarTotal = ({ value, size = 14 }) => {
  const digits = value > 1000 && value < 10000 ? '0.0' : '0'
  return (
    <Span>
      <span style={{ fontSize: size }}>
        {numeral(value).format(digits + ' a')}
      </span>
      <StarIcon size={size} />
    </Span>
  )
}

const Span = styled.span`
  display: inline-flex;
  align-items: center;
`
export const Avatar = ({ project, size = 100 }) => {
  const url = getProjectAvatarUrl(project, size)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const isMounted = React.useRef(true)

  useEffect(() => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      if (isMounted.current) setIsImageLoaded(true)
    }
    return () => {
      isMounted.current = false
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return isImageLoaded ? (
    <img src={url} width={size} height={size} alt={project.name} />
  ) : (
    <ImagePlaceHolder size={size} />
  )
}

const ImagePlaceHolder = props => {
  return (
    <PlaceHolderContainer {...props}>
      <ContentLoader
        viewBox="0 0 100 100"
        backgroundColor="#fbe6db"
        foregroundColor="#f9dccc"
      >
        <circle cx="50" cy="50" r="40" />
      </ContentLoader>
    </PlaceHolderContainer>
  )
}

const PlaceHolderContainer = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`

// From the HTML generated by 'react-content-loader' package
const ContentLoader = ({ viewBox, backgroundColor, foregroundColor }) => {
  return (
    <svg aria-labelledby="xw70t-aria" role="img" viewBox={viewBox}>
      <title id="xw70t-aria">Loading...</title>
      <rect
        role="presentation"
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#xw70t-diff)"
        fill="url(#xw70t-animated-diff)"
      />
      <defs role="presentation">
        <clipPath id="xw70t-diff">
          <circle cx="50" cy="50" r="40" />
        </clipPath>
        <linearGradient id="xw70t-animated-diff">
          <stop offset="-1.16929" stopColor={backgroundColor} stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="-0.16929" stopColor={foregroundColor} stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="0.83071" stopColor={backgroundColor} stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="1.2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

/*
Return the image URL to be displayed inside the project card
Can be either :
* the GitHub owner avatar (by default if no `icon` property is specified)
* A custom SVG file if project's `icon`property is specified.
The SVG can be stored locally (inside `www/logos` folder) or in the cloud.
*/

const isUrl = input => input.startsWith('http')

const formatIconUrl = input => (isUrl(input) ? input : `/logos/${input}`)

const formatOwnerAvatar = (owner_id, size) =>
  `https://avatars.githubusercontent.com/u/${owner_id}?v=3&s=${size}`

export function getProjectAvatarUrl(project, size) {
  return project.icon
    ? formatIconUrl(project.icon)
    : formatOwnerAvatar(project.owner_id, size)
}

export function getProjectId(project) {
  return slugify(project.name, { lower: true, remove: /[.'/]/g })
}