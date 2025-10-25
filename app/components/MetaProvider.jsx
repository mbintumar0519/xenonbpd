'use client';

/**
 * MetaProvider - Simplified wrapper component (tracking removed)
 * Meta tracking now handled directly in thank-you page
 */
export default function MetaProvider({ children }) {
  // No tracking logic needed - simplified to single Lead event on thank-you page
  return <>{children}</>;
}