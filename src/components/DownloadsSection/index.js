import React, { Component } from 'react'
import styled from 'styled-components'

const MP3_HREF = 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/dog_logic_higher_order_functions_mp3.zip'
const AAC_HREF = 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/dog_logic_higher_order_functions_aac.zip'
const WAV_HREF = 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/dog_logic_higher_order_functions_wav.zip'

const stems = [{
  index: '01',
  track: 'higher order',
  link: 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/stems/01-higher_order(126).zip',
  bpm: [126],
  size: '408mb'
}, {
  index: '02',
  track: 'heartbeats',
  link: 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/stems/02-heartbeats(124).zip',
  bpm: [124],
  size: '202mb'
}, {
  index: '03',
  track: 'ants army',
  link: 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/stems/03-ants_army(128).zip',
  bpm: [128],
  size: '196mb',
}, {
  index: '04',
  track: 'heartbeats',
  link: 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/stems/04-frog_song(128-120).zip',
  bpm: [128, 120],
  size: '269mb',
}, {
  index: '05',
  track: 'functions',
  link: 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/stems/05-functions(128).zip',
  bpm: [128],
  size: '278mb'
}, {
  index: '06',
  track: 'hush',
  link: 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/stems/06-hush(115).zip',
  bpm: [128],
  size: '189mb',
}, {
  index: '07',
  track: 'inner planets',
  link: 'https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/stems/07-inner_planets(128).zip',
  bpm: [128],
  size: '67mb',
}]

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

  renderStemDownloadLink(stem) {
    const { index, track, bpm, size } = stem
    const text = `${index}: ${track}`

    const details = ` (${bpm.join('/')})bpm | ${size}`
    return (
      <DownloadLink>
        <a href={stem.link}>{text}</a>
        {details}
      </DownloadLink>
    )
  }

  render() {
    return (
      <DonwloadSection>
        <Header>ALBUM DOWNLOAD</Header>
        {this.renderAlbumLinks()}

        <Header>STEMS DOWNLOAD</Header>
        <LinksWrapper>
          {stems.map(this.renderStemDownloadLink)}
        </LinksWrapper>
        <ComingSoon>more coming soon...</ComingSoon>
        <DummySection />
      </DonwloadSection>
    )
  }
}

const DonwloadSection = styled.div`
  color: white;

  a {
    margin-right: 15px;
    color: white;
    display: block;
  }
`

const ComingSoon = styled.span`
    margin-top: 20px;
`

const Header = styled.div`
    margin: 10px 0;
`

const LinksWrapper = styled.div`
  a {
    margin-right: 15px;
    display: block;
  }
  margin: 10px;
`
const DownloadLink = styled.span`
  display: flex;
`

const DummySection = styled.div`
  height: 200px;
`
