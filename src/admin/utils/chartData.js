import { getValue } from './resourceConfig';

// Charts represent fetched first-page records only; no totals are extrapolated.
export function ordersByStatus(orders) {
  if (!Array.isArray(orders) || !orders.length) return null;
  const statuses = orders.map((order) => order.status).filter((status) => typeof status === 'string' && status.trim());
  if (!statuses.length) return null;
  const counts = new Map();
  statuses.forEach((status) => counts.set(status, (counts.get(status) || 0) + 1));
  return { rows: [...counts].map(([name, value]) => ({ name, value })), represented: statuses.length, available: orders.length };
}

export function productsByCategory(products, categories) {
  if (!Array.isArray(products) || !products.length || !Array.isArray(categories) || !categories.length) return null;
  const names = new Map(categories.filter((category) => category.id != null).map((category) => [String(category.id), getValue(category, 'name')]));
  const counts = new Map();
  for (const product of products) {
    const id = product.category_id == null ? null : String(product.category_id);
    const name = id == null ? null : names.get(id);
    if (!name || name === '—') return null;
    const current = counts.get(id);
    counts.set(id, { name, value: (current?.value || 0) + 1 });
  }
  const nameCounts = new Map();
  counts.forEach(({ name }) => nameCounts.set(name, (nameCounts.get(name) || 0) + 1));
  return [...counts].map(([id, row]) => ({ name: nameCounts.get(row.name) > 1 ? `${row.name} #${id}` : row.name, value: row.value })).sort((a, b) => b.value - a.value);
}
