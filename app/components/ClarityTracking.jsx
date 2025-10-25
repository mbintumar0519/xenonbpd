'use client';

import { useEffect } from 'react';

export default function ClarityTracking() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    
    if (projectId && typeof window !== 'undefined') {
      // Load Microsoft Clarity script dynamically
      const script = document.createElement('script');
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `;
      document.head.appendChild(script);
      console.log('Microsoft Clarity initialized with project ID:', projectId);
    } else {
      console.warn('NEXT_PUBLIC_CLARITY_PROJECT_ID not found in environment variables');
    }
  }, []);

  return null;
}