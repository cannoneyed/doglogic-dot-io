import React, { Component } from 'react'
import { BaseLink, withRoute } from 'react-router5';

import {DownloadPage} from '../DownloadPage'
import {WelcomePage} from '../WelcomePage'

@withRoute
export default class App extends Component {
  render() {
    const {route} = this.props

    if (route.name === 'default') {
      return <WelcomePage />
    } else if (route.name === 'downloads') {
      return <DownloadPage />
    }

    return(
      <WelcomePage />
    )
  }
}