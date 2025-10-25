'use client';

import { useEffect } from 'react';

export default function AccessibilityAxe() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    (async () => {
      try {
        const axeReact = (await import('@axe-core/react')).default;
        const React = (await import('react')).default;
        const ReactDOM = (await import('react-dom')).default;
        axeReact(React, ReactDOM, 1000);
      } catch (e) {
        // dev-only, ignore
      }
    })();
  }, []);
  return null;
}


