function isTablet() {
  // Regular expressions for common tablet user agents
  const tabletRegex = /iPad|Android|Touch/i;

  // Check if the user agent matches any of the tablet regex
  return tabletRegex.test(navigator.userAgent);
}

export default isTablet;
