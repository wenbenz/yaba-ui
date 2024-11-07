export function getLocation(isDev) {
  let host = window.location.protocol + "//" + window.location.hostname;
  if (isDev) {
    host += ":3000";
  }
  return host;
}
