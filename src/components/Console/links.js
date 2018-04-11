import React, { Component } from 'react'
import styled from 'styled-components'
import {observer} from 'mobx-react'

import {registrationManager} from '../../registration'


const SPOTIFY_HREF = 'https://open.spotify.com/album/2ggejIHUWTatvfXyC7WN1X'
const ITUNES_HREF = 'https://itunes.apple.com/us/album/higher-order-functions/1359303261'
const SOUNDCLOUD_HREF = 'https://soundcloud.com/doglogic/sets/higher-order-functions-1'

@observer
export class Links extends Component {
  renderLinks = () => {
    return (
      <LinksWrapper>
        <a href={SPOTIFY_HREF} target="blank">spotify</a>
        <a href={ITUNES_HREF} target="blank">itunes</a>
        <a href={SOUNDCLOUD_HREF} target="blank">soundcloud</a>
        {registrationManager.hasRegistered && <a href="/downloads">download</a>}
      </LinksWrapper>
    )
  }
  
  render() {
    return (
      <div>
        <div>{'█͇█͇͇█͇͇͇█͇͇͇͇█͇͇͇͇͇█͇͇͇͇͇͇█͇͇͇͇͇͇͇█͇͇͇͇͇͇͇͇█͇͇͇͇͇͇͇͇͇'}</div>
        <div>debut album available now: {this.renderLinks()}</div>
        
        <div>enter email for free download, stems, and more</div>
      </div>
    )
  }
}

const LinksWrapper = styled.span`
  > a {
    margin-right: 15px;
    color: white;
  }
`