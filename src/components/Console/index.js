import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MediaQuery from 'react-responsive'
import styled from 'styled-components'
import Console from 'react-console-component'
import emailValidator from 'email-validator'
import jsonp from 'jsonp'
import {observer} from 'mobx-react'

import colors from 'constants/colors'
import {Links} from './links'

import {registrationManager} from '../../registration'

const action =
  'https://doglogic.us17.list-manage.com/subscribe/post?u=97213734d5b0ce1d4858be710&amp;id=360faf6599&SIGNUP=doglogic_dot_io'
const getAjaxUrl = url => url.replace('/post?', '/post-json?')

@observer
export default class ConsoleComponent extends Component {
  componentDidMount() {
    this.consoleElement = ReactDOM.findDOMNode(this.console)
    if (this.consoleElement) {
      const textarea = this.consoleElement.querySelector('textarea')
      setTimeout(this.toggleCursor, 500)
      this.console.focus()
    }

    // Add the specific download links to the welcome message
    const welcomeElement = this.consoleElement.querySelector('.react-console-welcome')
    this.linksElement = <Links hasRegistered={registrationManager.hasRegistered}/>
    ReactDOM.render(this.linksElement, welcomeElement)
  }

  toggleCursor = (on = true) => {
    this.cursorElement = this.consoleElement.querySelector('.react-console-cursor')
    if (this.cursorElement) {
      this.cursorElement.style.backgroundColor = on ? colors[0] : colors[13]
      this.cursorElement.style.opacity = 0.5
    }
    setTimeout(() => this.toggleCursor(!on), 500)
  }

  setRegistered = () => {
    registrationManager.setRegistered()
  }

  alreadyRegisteredText = (text) => {
    return `${text} is already registered.\nuse download links above.`
  }

  handleError = (err, data, text) => {
    if (data.msg.indexOf('is already subscribed') !== -1) {
      this.setRegistered()
      return this.alreadyRegisteredText(text)
    } else if (data.msg.indexOf('invalid') !== -1) {
      return `please enter a valid email`
    } else {
      return err || data.msg
    }
  }

  handleConsoleSubmit = text => {
    if (!text) {
      return
    }

    if (registrationManager.hasRegistered) {
      if (emailValidator.validate(text)) {
        const message = this.alreadyRegisteredText(text)
        this.console.log(message)
      } else {
        this.console.log(text)
      }
      return this.console.return()
    }

    const valid = emailValidator.validate(text)
    if (!valid) {
      this.console.log('please enter a valid email')
      this.console.return()
    } else {
      const url = getAjaxUrl(action) + `&EMAIL=${encodeURIComponent(text)}`
      const opts = { param: 'c' }
      jsonp(url, opts, (err, data) => {
        if (err || data.result === 'error') {
          const errorMsg = this.handleError(err, data, text)
          this.console.log(errorMsg)
        } else {
          this.console.log(`${text} succesfully registered!`)
          this.setRegistered()
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
    return (
      <ConsoleWrapper>
        <Console
          ref={ref => {
            this.console = ref
          }}
          handler={this.handleConsoleSubmit}
          autofocus={true}
          promptLabel={'> '}
          welcomeMessage={'█͇█͇͇█͇͇͇█͇͇͇͇█͇͇͇͇͇█͇͇͇͇͇͇█͇͇͇͇͇͇͇█͇͇͇͇͇͇͇͇█͇͇͇͇͇͇͇͇͇'}
        />
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
