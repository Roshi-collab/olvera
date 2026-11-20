
const isLocal = window.location.hostname === 'localhost'
    || window.location.hostname === '127.0.0.1';

export const BASE_URL = isLocal
    ? 'http://localhost:3000'
    : 'https://olvera-api.onrender.com';

export const STORE_BASE_URL = 'https://world.openbeautyfacts.org';

export function authFetch(url, options) {
    const token = localStorage.getItem('token');

    if (!token) {
        return fetch(url, options);
    }

    return fetch(url, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            window.location.assign('/auth');
        }

        return response;
    });
}
