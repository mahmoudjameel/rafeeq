import React, { useEffect } from 'react';

interface GoogleTagManagerProps {
  containerId?: string;
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ containerId }) => {
  useEffect(() => {
    if (!containerId) return;

    // dataLayer
    const dataLayerScript = document.createElement('script');
    dataLayerScript.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());`;
    document.head.appendChild(dataLayerScript);

    // GTM script
    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
    document.head.appendChild(gtmScript);

    // Noscript iframe for GTM (appended to body)
    const noScript = document.createElement('noscript');
    noScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noScript);

    return () => {
      document.head.removeChild(dataLayerScript);
      document.head.removeChild(gtmScript);
      document.body.removeChild(noScript);
    };
  }, [containerId]);

  return null;
};

export default GoogleTagManager;


