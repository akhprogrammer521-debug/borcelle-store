import { adminRequest, AdminApiError } from './client';

// Each resource and method is present in the supplied Postman collection.
export const ADMIN_RESOURCES = {
  products: { endpoint: '/admin/product', singular: 'Product' },
  categories: { endpoint: '/admin/category', singular: 'Category' },
  brands: { endpoint: '/admin/brand', singular: 'Brand' },
  orders: { endpoint: '/admin/order', singular: 'Order' },
  cities: { endpoint: '/admin/city', singular: 'City' },
  municipals: { endpoint: '/admin/municipal', singular: 'Municipal' },
};

function resource(name) {
  const config = ADMIN_RESOURCES[name];
  if (!config) throw new Error(`Unknown admin resource: ${name}`);
  return config;
}

export const adminApi = {
  login: (email, password) => adminRequest('/admin/login', { method: 'POST', body: { email, password }, authenticated: false }),
  logout: () => adminRequest('/admin/logout', { method: 'POST' }),
  list: (name, page = 1, signal) => adminRequest(`${resource(name).endpoint}?page=${page}`, { signal }),
  detail: (name, id) => adminRequest(`${resource(name).endpoint}/${encodeURIComponent(id)}`),
  create: (name, body) => adminRequest(resource(name).endpoint, { method: 'POST', body }),
  update: (name, id, body) => adminRequest(`${resource(name).endpoint}/${encodeURIComponent(id)}`, { method: 'PUT', body }),
  remove: (name, id) => adminRequest(`${resource(name).endpoint}/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};

export function parseListResponse(response, endpoint) {
  const paginator = response?.data && !Array.isArray(response.data) ? response.data : null;
  const items = Array.isArray(response?.data) ? response.data : paginator?.data;
  if (!Array.isArray(items)) {
    throw new AdminApiError(`GET ${endpoint}: expected a data array in the response.`, 200, endpoint, response);
  }
  if (items.some((item) => !item || typeof item !== 'object' || item.id === undefined || item.id === null)) {
    throw new AdminApiError(`GET ${endpoint}: a record is missing its id in the response.`, 200, endpoint, response);
  }
  const meta = response?.meta || paginator || {};
  const currentPage = Number(meta.current_page);
  const lastPage = Number(meta.last_page);
  const total = Number(meta.total);
  return {
    items,
    currentPage: Number.isInteger(currentPage) && currentPage > 0 ? currentPage : null,
    lastPage: Number.isInteger(lastPage) && lastPage > 0 ? lastPage : null,
    total: meta.total !== undefined && meta.total !== null && meta.total !== '' && Number.isFinite(total) ? total : null,
    next: response?.links?.next || paginator?.next_page_url || null,
    previous: response?.links?.prev || paginator?.prev_page_url || null,
  };
}

export function parseDetailResponse(response, endpoint) {
  const item = response?.data;
  if (!item || Array.isArray(item) || typeof item !== 'object') {
    throw new AdminApiError(`GET ${endpoint}: expected a data object in the response.`, 200, endpoint, response);
  }
  return item;
}
