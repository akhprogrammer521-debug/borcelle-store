const text = (key, label, required = true) => ({ key, label, type: 'text', required });
const number = (key, label, required = true) => ({ key, label, type: 'number', required });

const bilingualNames = [text('en.name', 'English name'), text('ar.name', 'Arabic name')];

export const RESOURCE_CONFIG = {
  products: {
    title: 'Products',
    description: 'Manage product details, pricing, and translations.',
    createFields: [text('sku', 'SKU'), { ...number('category_id', 'Category ID'), hint: 'Use an ID from Categories.' }, { ...number('price', 'Price'), step: '0.01' }, text('en.name', 'English name'), { key: 'en.description', label: 'English description', type: 'textarea', required: true }, text('ar.name', 'Arabic name'), { key: 'ar.description', label: 'Arabic description', type: 'textarea', required: true }],
    columns: ['id', 'sku', 'name', 'category_id', 'price'],
  },
  categories: {
    title: 'Categories',
    description: 'Organize products with bilingual categories.',
    createFields: bilingualNames,
    columns: ['id', 'name', 'name_ar'],
  },
  brands: {
    title: 'Brands',
    description: 'Maintain your store brands.',
    createFields: [text('name', 'Brand name'), ...bilingualNames],
    editFields: [text('name', 'Brand name')],
    columns: ['id', 'name', 'name_ar'],
  },
  orders: {
    title: 'Orders',
    description: 'Review and manage customer orders.',
    createFields: [{ ...number('customer_id', 'Customer ID'), hint: 'Enter an existing customer ID.' }, { ...number('address_id', 'Address ID'), hint: 'Enter an existing address ID.' }, text('notes', 'Notes', false)],
    editFields: [text('status', 'Status', false), text('notes', 'Notes', false)],
    columns: ['id', 'customer_id', 'status', 'created_at'],
  },
  cities: {
    title: 'Cities',
    description: 'Manage delivery cities and their translations.',
    createFields: bilingualNames,
    columns: ['id', 'name', 'name_ar'],
  },
  municipals: {
    title: 'Municipals',
    description: 'Manage municipal districts within cities.',
    createFields: [{ ...number('city_id', 'City ID'), hint: 'Use an ID from Cities.' }, ...bilingualNames],
    columns: ['id', 'name', 'name_ar', 'city_id'],
  },
};

export function getValue(item, key) {
  if (key === 'name_ar') return item?.ar?.name ?? '—';
  if (key === 'name') return typeof item?.name === 'string' ? item.name : item?.en?.name ?? '—';
  return key.split('.').reduce((value, part) => value?.[part], item) ?? '';
}

export function formValue(item, key) {
  const value = getValue(item, key);
  return value === '—' || value === null || value === undefined ? '' : String(value);
}

export function setNestedValue(target, key, value) {
  const parts = key.split('.');
  if (parts.length === 1) {
    target[key] = value;
  } else {
    target[parts[0]] ||= {};
    target[parts[0]][parts[1]] = value;
  }
}
