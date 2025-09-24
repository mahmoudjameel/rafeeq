import React from 'react';
import { useWebsite } from '../context/WebsiteContext';
import TikTokPixel from './TikTokPixel';
import SnapchatPixel from './SnapchatPixel';
import GoogleTagManager from './GoogleTagManager';

const TrackingBoot: React.FC = () => {
  const { websiteData } = useWebsite();
  const tiktokId = websiteData.settings?.tiktokPixelId;
  const snapId = websiteData.settings?.snapchatPixelId;
  const gtmId = websiteData.settings?.gtmContainerId;

  return (
    <>
      {tiktokId ? <TikTokPixel pixelId={tiktokId} /> : null}
      {snapId ? <SnapchatPixel pixelId={snapId} /> : null}
      {gtmId ? <GoogleTagManager containerId={gtmId} /> : null}
    </>
  );
};

export default TrackingBoot;


