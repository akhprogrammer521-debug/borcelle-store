import { clearAdminToken, getAdminToken } from '../utils/auth';

// Matches the base_url variable in Tamkeen_Admin_APIs.postman_collection.json.
export const ADMIN_API_BASE_URL = 'https://training.tamkeen-dev.com/tamkeenstore/public/api';

export class AdminApiError extends Error {
  constructor(message, status, endpoint, response) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
    this.endpoint = endpoint;
    this.response = response;
  }
}

export async function adminRequest(endpoint, { method = 'GET', body, authenticated = true, signal } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (authenticated) {
    const token = getAdminToken();
    if (!token) throw new AdminApiError('Admin session is missing. Sign in again.', 401, endpoint);
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${ADMIN_API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new AdminApiError(`Could not reach ${ADMIN_API_BASE_URL}${endpoint}: ${error.message}`, 0, endpoint);
  }

  const raw = await response.text();
  let result = null;
  if (raw) {
    try {
      result = JSON.parse(raw);
    } catch {
      throw new AdminApiError(`Unexpected non-JSON response from ${method} ${endpoint}.`, response.status, endpoint, raw);
    }
  }

  if (!response.ok) {
    if (response.status === 401 && authenticated) clearAdminToken();
    const message = result?.message || result?.error || `Request failed (${response.status})`;
    const validation = result?.errors && typeof result.errors === 'object'
      ? ` ${Object.entries(result.errors).map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`).join('; ')}`
      : '';
    throw new AdminApiError(`${method} ${endpoint}: ${message}${validation}`, response.status, endpoint, result);
  }
  return result;
}
