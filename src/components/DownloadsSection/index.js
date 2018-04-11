import React, { Component } from 'react'
import styled from 'styled-components'

const MP3_HREF = 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/dog_logic_higher_order_functions_mp3.zip'
const AAC_HREF = 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/dog_logic_higher_order_functions_aac.zip'
const WAV_HREF = 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/dog_logic_higher_order_functions_wav.zip'

export class DownloadsSection extends Component {
  renderAlbumLinks = () => {
    return (
      <LinksWrapper>
        <a href={MP3_HREF} target="blank">mp3</a>
        <a href={AAC_HREF} target="blank">aac</a>
        <a href={WAV_HREF} target="blank">wav</a>
      </LinksWrapper>
    )
  }

  render() {
    return (
      <div>
        <Header>ALBUM DOWNLOAD</Header>
        {this.renderAlbumLinks()}
        
        <Header>STEMS DOWNLOAD</Header>
        <ComingSoon>coming soon...</ComingSoon>
      </div>
    )
  }
}

const ComingSoon = styled.span`
    color: white;    
`

const Header = styled.div`
    margin: 10px 0;
`

const LinksWrapper = styled.span`
  > a {
    margin-right: 15px;
    color: white;
    display: block;
  }
`