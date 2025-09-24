import React, { useEffect } from 'react';

interface SnapchatPixelProps {
  pixelId?: string;
}

const SnapchatPixel: React.FC<SnapchatPixelProps> = ({ pixelId }) => {
  useEffect(() => {
    if (!pixelId) return;

    const script = document.createElement('script');
    script.innerHTML = `(function(w,d){var sc=w.snaptr=function(){sc.handleRequest?sc.handleRequest.apply(sc,arguments):sc.queue.push(arguments)};sc.queue=[];var s=document.createElement('script');s.async=!0;s.src='https://sc-static.net/scevent.min.js';var a=document.getElementsByTagName('script')[0];a.parentNode.insertBefore(s,a);})(window,document); snaptr('init', '${pixelId}'); snaptr('track','PAGE_VIEW');`;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [pixelId]);

  return null;
};

export default SnapchatPixel;


