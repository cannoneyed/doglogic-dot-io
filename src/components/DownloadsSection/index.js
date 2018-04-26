import React, { Component } from "react";
import styled from "styled-components";

const MP3_HREF =
  "https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/dog_logic_higher_order_functions_mp3.zip";
const AAC_HREF =
  "https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/dog_logic_higher_order_functions_aac.zip";
const WAV_HREF =
  "https://s3-us-west-2.amazonaws.com/higher-order-functions.clips/downloads/dog_logic_higher_order_functions_wav.zip";

import { stems } from "./stems";

export class DownloadsSection extends Component {
  renderAlbumLinks = () => {
    return (
      <LinksWrapper>
        <a href={MP3_HREF} target="blank">
          mp3
        </a>
        <a href={AAC_HREF} target="blank">
          aac
        </a>
        <a href={WAV_HREF} target="blank">
          wav
        </a>
      </LinksWrapper>
    );
  };

  renderStemDownloadLink(stem) {
    const { index, track, bpm, size } = stem;
    const text = `${index}: ${track}`;

    const details = ` (${bpm.join("/")})bpm | ${size}`;
    return (
      <DownloadLink>
        <a href={stem.link}>{text}</a>
        {details}
      </DownloadLink>
    );
  }

  render() {
    return (
      <DonwloadSection>
        <Header>ALBUM DOWNLOAD</Header>
        {this.renderAlbumLinks()}

        <Header>STEMS DOWNLOAD</Header>
        <LinksWrapper>{stems.map(this.renderStemDownloadLink)}</LinksWrapper>
        <DummySection />
      </DonwloadSection>
    );
  }
}

const DonwloadSection = styled.div`
  color: white;

  a {
    margin-right: 15px;
    color: white;
    display: block;
  }
`;

const ComingSoon = styled.span`
  margin-top: 20px;
`;

const Header = styled.div`
  margin: 10px 0;
`;

const LinksWrapper = styled.div`
  a {
    margin-right: 15px;
    display: block;
  }
  margin: 10px;
`;
const DownloadLink = styled.span`
  display: flex;
`;

const DummySection = styled.div`
  height: 200px;
`;
