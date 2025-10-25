// Utility functions for proper name capitalization

export function splitAndCapitalizeName(fullName) {
  if (!fullName || typeof fullName !== 'string') {
    return { firstName: '', lastName: '' };
  }

  const parts = fullName.trim().split(/\s+/);
  
  // Capitalize each word properly
  const capitalizedParts = parts.map(part => 
    part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  );
  
  const firstName = capitalizedParts[0] || '';
  const lastName = capitalizedParts.slice(1).join(' ') || '';
  
  return { firstName, lastName };
}

export function capitalizeFullName(fullName) {
  if (!fullName || typeof fullName !== 'string') {
    return '';
  }

  return fullName.trim()
    .split(/\s+/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}