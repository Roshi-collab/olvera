const isLocal = window.location.hostname === 'localhost';

export const BASE_URL = isLocal
  ? 'http://localhost:3000'
  : 'https://olvera-api.onrender.com';

export const STORE_BASE_URL = 'https://world.openbeautyfacts.org';