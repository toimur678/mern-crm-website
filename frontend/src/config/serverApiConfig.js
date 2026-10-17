// Relative URLs use Vite's development proxy and also work on phones on the LAN.
// A configured backend continues to support separately hosted production builds.
const configuredBackend =
  import.meta.env.PROD || import.meta.env.VITE_DEV_REMOTE === 'remote'
    ? import.meta.env.VITE_BACKEND_SERVER?.trim()
    : '';
export const BASE_URL = configuredBackend ? configuredBackend.replace(/\/?$/, '/') : '/';
export const API_BASE_URL = BASE_URL + 'api/';
export const DOWNLOAD_BASE_URL = BASE_URL + 'download/';
export const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL || BASE_URL;
export const WEBSITE_URL = typeof window === 'undefined' ? '/' : window.location.origin + '/';
export const ACCESS_TOKEN_NAME = 'x-auth-token';
