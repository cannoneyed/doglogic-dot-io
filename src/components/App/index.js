import React, { Component } from 'react'
import { withState } from 'recompose'
import styled from 'styled-components'
import colors from 'constants/colors'
import { range } from 'lodash'

import EmailForm from '../EmailForm'
import Console from '../Console'

const DELAY = 1000
const glitchStr = "'̨͓̮͙̫͕̠̮̩̦͇͖͍̭̩ͮ̑̔̒ͮ̾̚͢͢͝ḡ̢̲̭̜̭̩̠̣̭̰̞͎͕̩̰̾̍̐̇̈́͌̅̃̑̒̇̆́̀͘͡3ͮ̓͐ͮ҉̴̵̜͕́͡"

@withState('dots', 'setDots', 0)
export default class App extends Component {
  componentDidMount() {
    setTimeout(this.addDot, DELAY)
  }

  addDot = () => {
    this.props.setDots(this.props.dots + 1)
    setTimeout(this.addDot, Math.random() * DELAY)
  }

  render() {
    const dots = () =>
      range(200)
        .map(() => '.')
        .join('')

    const glitch = () => glitchStr.substring(0, this.props.dots * 2)

    const src = 'https://www.youtube.com/embed/VrEZeSQ9VWY?rel=0&amp;showinfo=0'

    return (
      <PageWrapper>
        <PageContainer>
          <Row>
            <VideoSection>
              <iframe width="100%" src={src} frameBorder="0" allowFullScreen />
            </VideoSection>
          </Row>
          <Row>
            <Hash colorIndex={2}>0418</Hash>
            <Prompt>/~dog_logic: </Prompt>
            <Line>higher order functions{dots()}</Line>
          </Row>
          <Row>
            <Line>
              {
                '> - █̿̿̿̿̿̿̿̿̿█̿̿̿̿̿̿̿̿█̿̿̿̿̿̿̿█̿̿̿̿̿̿█̿̿̿̿̿█̿̿̿̿█̿̿̿█̿̿█̿█͇█͇͇█͇͇͇█͇͇͇͇█͇͇͇͇͇█͇͇͇͇͇͇█͇͇͇͇͇͇͇█͇͇͇͇͇͇͇͇█͇͇͇͇͇͇͇͇͇'
              }
              {glitch()}
            </Line>
          </Row>
          <Row />
          <Row mt={0.1}>
            <Console />
          </Row>
        </PageContainer>
      </PageWrapper>
    )
  }
}
const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PageContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
`

const Row = styled.div`
  overflow: hidden;
  white-space: nowrap;
  font-size: 1rem;
  margin-bottom: 0.1em;
  margin-top: ${props => props.mt || 0}rem;
`

const Placeholder = styled.span`
  color: ${colors[13]};
  /* multi-line */
`

const Prompt = styled.span`
  color: ${colors[1]};
  /* multi-line */
`

const Line = styled.span`
  color: ${colors[0]};
  overflow: hidden;
  white-space: nowrap;
  opacity: ${props => props.opacity || 1};
`

const Hash = styled.span`
  color: ${props => colors[props.colorIndex]};
`

const VideoSection = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
  > iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
