export function getLocation(isDev) {
  let host = window.location.protocol + "//" + window.location.hostname;
  if (isDev) {
    host += ":9222";
  }
  return host;
}
