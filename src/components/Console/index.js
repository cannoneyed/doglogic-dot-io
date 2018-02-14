import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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
    const textarea = this.consoleElement.querySelector('textarea')
    textarea.setAttribute('type', 'email')
    console.log(textarea)

    setTimeout(this.toggleCursor, 500)
  }

  state = {
    hasRegistered: false,
  }

  toggleCursor = (on = true) => {
    this.cursorElement = this.consoleElement.querySelector('.react-console-cursor')
    const isFocused = this.consoleElement.classList.contains('react-console-focus')
    if (this.cursorElement) {
      this.cursorElement.style.backgroundColor = on && isFocused ? colors[0] : colors[13]
      this.cursorElement.style.opacity = 0.5
    }
    setTimeout(() => this.toggleCursor(!on), 500)
  }

  echo = text => {
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

  render() {
    const welcomeMessage =
      '█͇█͇͇█͇͇͇█͇͇͇͇█͇͇͇͇͇█͇͇͇͇͇͇█͇͇͇͇͇͇͇█͇͇͇͇͇͇͇͇█͇͇͇͇͇͇͇͇͇\ndebut album release 0418\nenter email for free download, stems, and more'
    return (
      <ConsoleWrapper>
        <Console
          ref={ref => {
            this.console = ref
          }}
          handler={this.echo}
          autofocus={true}
          promptLabel={'> '}
          welcomeMessage={welcomeMessage}
        />
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
