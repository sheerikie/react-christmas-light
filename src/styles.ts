import styled, { css } from 'styled-components'
import { shade } from 'polished'

interface CircleProps {
  isLighted: boolean
  color: string
  size: string
}


export const CircleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

  & + div {
    margin-top: 15px;
  }
`

export const Circle = styled.div<CircleProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  ${(props) =>
    props.size &&
    css`
      width: ${props.size}px;
      height: ${props.size}px;
    `}

  opacity: 0.5;

  ${(props) =>
    props.isLighted &&
    props.color &&
    css`
      opacity: 1;
      box-shadow: 0 0 3px ${props.color}, 0 0 15px ${props.color},
        0 0 30px ${props.color};
    `}

  background: purple;

  ${(props) =>
    props.color &&
    css`
      background: ${props.color};
    `}

  & + div {
    margin-left: 15px;
  }
`

