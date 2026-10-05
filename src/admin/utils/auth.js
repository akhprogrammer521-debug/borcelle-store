const TOKEN_KEY = 'admin_token';
const TOKEN_EVENT = 'borcelle:admin-token-changed';

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(TOKEN_EVENT));
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(TOKEN_EVENT));
}

export function subscribeToAdminToken(callback) {
  window.addEventListener(TOKEN_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(TOKEN_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}
