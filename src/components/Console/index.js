import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MediaQuery from 'react-responsive'
import styled from 'styled-components'
import Console from 'react-console-component'
import isEmail from 'isemail'
import jsonp from 'jsonp'

import colors from 'constants/colors'

const action =
  'https://doglogic.us17.list-manage.com/subscribe/post?u=97213734d5b0ce1d4858be710&amp;id=360faf6599&SIGNUP=doglogic_dot_io'
const getAjaxUrl = url => url.replace('/post?', '/post-json?')

const getErrorMsg = (err, data, email) => {
  if (data.msg.indexOf('is already subscribed') !== -1) {
    return `${email} is already registered.`
  } else if (data.msg.indexOf('invalid') !== -1) {
    return `please enter a valid email`
  } else {
    return err || data.msg
  }
}

export default class ConsoleComponent extends Component {
  componentDidMount() {
    this.consoleElement = ReactDOM.findDOMNode(this.console)
    if (this.consoleElement) {
      const textarea = this.consoleElement.querySelector('textarea')
      setTimeout(this.toggleCursor, 500)
      this.console.focus()
      console.log(this.console)
    }
  }

  state = {
    hasRegistered: false,
  }

  toggleCursor = (on = true) => {
    this.cursorElement = this.consoleElement.querySelector('.react-console-cursor')
    if (this.cursorElement) {
      this.cursorElement.style.backgroundColor = on ? colors[0] : colors[13]
      this.cursorElement.style.opacity = 0.5
    }
    setTimeout(() => this.toggleCursor(!on), 500)
  }

  handleConsoleSubmit = text => {
    if (!text) {
      return
    }

    if (this.state.hasRegistered) {
      this.console.log(text)
      this.console.return()
      return
    }

    const valid = isEmail.validate(text)
    if (!valid) {
      this.console.log('please enter a valid email')
      this.console.return()
    } else {
      const url = getAjaxUrl(action) + `&EMAIL=${encodeURIComponent(text)}`
      const opts = { param: 'c' }
      jsonp(url, opts, (err, data) => {
        if (err || data.result === 'error') {
          console.log(err, data)
          const errorMsg = getErrorMsg(err, data, text)
          this.console.log(errorMsg)
        } else {
          this.console.log(`${text} succesfully registered!`)
          this.setState({ hasRegistered: true })
        }
        this.console.return()
      })
    }
  }

  handleSubmit = e => {
    if (e) {
      e.preventDefault()
    }
    const text = this.input.value
    this.input.value = ''
    setTimeout(() => {
      this.console.acceptLine()
    }, 0)
  }

  handleInputChange = () => {
    const text = this.input.value
    const textarea = this.consoleElement.querySelector('textarea')
    textarea.value = text
    this.console.change()
  }

  render() {
    const welcomeMessage =
      '█͇█͇͇█͇͇͇█͇͇͇͇█͇͇͇͇͇█͇͇͇͇͇͇█͇͇͇͇͇͇͇█͇͇͇͇͇͇͇͇█͇͇͇͇͇͇͇͇͇\ndebut album release 0418\nenter email for free download, stems, and more'
    return (
      <ConsoleWrapper>
        <MediaQuery minDeviceWidth={1224}>
          <Console
            ref={ref => {
              this.console = ref
            }}
            handler={this.handleConsoleSubmit}
            autofocus={true}
            promptLabel={'> '}
            welcomeMessage={welcomeMessage}
          />
        </MediaQuery>
        <BottomSection>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleInputChange}
              ref={ref => (this.input = ref)}
              placeholder="enter email"
              type="email"
            />
            <button onClick={this.handleSubmit}>submit</button>
          </form>
        </BottomSection>
      </ConsoleWrapper>
    )
  }
}

const ConsoleWrapper = styled.div`
  & .react-console-message {
    opacity: 0.5;
  }
  & .react-console-welcome {
    white-space: pre-line;
  }
`

const BottomSection = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  max-width: 800px;

  > form {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;

    > input {
      background-color: ${colors[0]};
      font-family: 'Ubuntu Mono', monospace;
      height: 1.2rem;
      font-size: 1.2rem;
      width: 70%;
    }

    > input:focus {
      outline: none;
    }

    > button {
      border: 1px solid ${colors[0]};
      background-color: black;
      color: ${colors[0]};
      font-family: 'Ubuntu Mono', monospace;
      height: 1.5rem;
      font-size: 1.2rem;
      padding: 0;
      width: 20%;
    }
  }
`
