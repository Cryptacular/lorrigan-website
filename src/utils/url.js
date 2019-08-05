export function extractDomainFromUrl(url) {
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  return (matches && matches[1]) || "...";
}
