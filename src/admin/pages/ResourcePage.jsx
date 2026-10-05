import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { adminApi, ADMIN_RESOURCES, parseDetailResponse } from '../api/resources';
import useAdminList from '../hooks/useAdminList';
import { RESOURCE_CONFIG, getValue } from '../utils/resourceConfig';
import ActionButton from '../components/ActionButton';
import Button from '../components/Button';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import PageMotion from '../components/PageMotion';
import Pagination from '../components/Pagination';
import ResourceForm from '../components/ResourceForm';
import { ErrorState, LoadingState, TableSkeleton } from '../components/States';

const columnLabels = { id: 'ID', sku: 'SKU', name: 'Name', name_ar: 'Arabic name', category_id: 'Category ID', city_id: 'City ID', customer_id: 'Customer ID', price: 'Price', status: 'Status', created_at: 'Created' };

export default function ResourcePage({ resource }) {
  const config = RESOURCE_CONFIG[resource];
  const [page, setPage] = useState(1);
  const { data, loading, error, refresh } = useAdminList(resource, page);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { if (error) toast.error(error.message, { id: `admin-list-${resource}` }); }, [error, resource]);

  function changePage(nextPage) {
    setPage(nextPage);
    refresh();
    setSearch('');
  }

  function startCreate() {
    setActionError('');
    setModal({ mode: 'create' });
  }

  async function openDetail(mode, item) {
    setActionError('');
    setModal({ mode, id: item.id, loading: true });
    const endpoint = `${ADMIN_RESOURCES[resource].endpoint}/${encodeURIComponent(item.id)}`;
    try {
      const response = await adminApi.detail(resource, item.id);
      const detail = parseDetailResponse(response, endpoint);
      setModal((current) => current?.mode === mode && current?.id === item.id ? { mode, id: item.id, item: detail } : current);
    } catch (requestError) {
      setModal((current) => current?.mode === mode && current?.id === item.id ? { mode, id: item.id, error: requestError } : current);
      toast.error(requestError.message);
    }
  }

  async function save(body) {
    if (modal.mode === 'edit' && !Object.keys(body).length) {
      setActionError('No changes to save.');
      toast.error('No changes to save.');
      return;
    }
    setSaving(true);
    setActionError('');
    try {
      if (modal.mode === 'create') await adminApi.create(resource, body);
      else await adminApi.update(resource, modal.id, body);
      toast.success(`${ADMIN_RESOURCES[resource].singular} ${modal.mode === 'create' ? 'created' : 'updated'} successfully.`);
      setModal(null);
      if (modal.mode === 'create' && page !== 1) setPage(1);
      refresh();
    } catch (requestError) {
      setActionError(requestError.message);
      toast.error(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    setSaving(true);
    setActionError('');
    try {
      await adminApi.remove(resource, modal.id);
      toast.success(`${ADMIN_RESOURCES[resource].singular} deleted successfully.`);
      setModal(null);
      if (data?.items.length === 1 && page > 1) setPage(page - 1);
      refresh();
    } catch (requestError) {
      setActionError(requestError.message);
      toast.error(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  const columns = config.columns.map((key) => ({
    key,
    label: columnLabels[key],
    render: (item) => {
      const value = getValue(item, key);
      if (key === 'created_at' && value && !Number.isNaN(Date.parse(value))) return new Date(value).toLocaleDateString();
      if (key === 'name_ar') return <span dir="rtl" className="ad:block ad:text-left">{value}</span>;
      return value === '' ? '—' : String(value);
    },
  }));
  const detailFields = [{ key: 'id', label: 'ID' }, ...config.createFields, ...(config.editFields || []), ...config.columns.map((key) => ({ key, label: columnLabels[key] }))]
    .filter((field, index, fields) => fields.findIndex((candidate) => candidate.key === field.key) === index);
  const filteredRows = search.trim()
    ? (data?.items || []).filter((item) => config.columns.some((key) => String(getValue(item, key)).toLowerCase().includes(search.trim().toLowerCase())))
    : (data?.items || []);

  return <PageMotion className="ad:space-y-6">
    <section className="admin-hero ad:rounded-[30px] ad:border ad:border-white/80 ad:px-6 ad:py-8 ad:shadow-[0_22px_60px_-42px_rgba(192,79,122,.45)] ad:sm:px-9 ad:sm:py-9 ad:xl:px-12"><div className="ad:relative ad:flex ad:flex-wrap ad:items-end ad:justify-between ad:gap-5"><div className="ad:max-w-2xl"><span className="ad:text-[11px] ad:font-bold ad:uppercase ad:tracking-[.2em] ad:text-rose-600">Catalog and operations</span><h2 className="ad:mt-3 ad:mb-2 ad:text-3xl ad:font-semibold ad:tracking-tight ad:text-[#312838] ad:sm:text-4xl">{config.title}</h2><p className="ad:mb-0 ad:text-sm ad:leading-6 ad:text-slate-600">{config.description}</p></div><Button variant="primary" onClick={startCreate} className="ad:relative"><FiPlus size={17} />Add {ADMIN_RESOURCES[resource].singular}</Button></div></section>
    {loading ? <TableSkeleton columns={config.columns.length + 1} /> : error ? <ErrorState error={error} onRetry={refresh} /> : <><DataTable columns={columns} rows={filteredRows} loadedCount={data?.items.length || 0} searchValue={search} onSearchChange={setSearch} emptyMessage={`No ${config.title.toLowerCase()} found.`} renderActions={(item) => <><ActionButton action="view" label={`View ${item.id}`} onClick={() => openDetail('view', item)} /><ActionButton action="edit" label={`Edit ${item.id}`} onClick={() => openDetail('edit', item)} /><ActionButton action="delete" label={`Delete ${item.id}`} onClick={() => { setActionError(''); setModal({ mode: 'delete', id: item.id }); }} /></>} /><Pagination page={page} data={data} onPageChange={changePage} /></>}
    <AnimatePresence mode="wait">{modal?.mode === 'delete' ? <ConfirmDeleteDialog key={`delete-${modal.id}`} singular={ADMIN_RESOURCES[resource].singular} id={modal.id} error={actionError} saving={saving} onClose={() => { if (!saving) setModal(null); }} onConfirm={remove} /> : modal ? <Modal key={`${modal.mode}-${modal.id ?? 'new'}`} title={modal.mode === 'create' ? `Add ${ADMIN_RESOURCES[resource].singular}` : modal.mode === 'view' ? `${ADMIN_RESOURCES[resource].singular} details` : `Edit ${ADMIN_RESOURCES[resource].singular}`} onClose={() => { if (!saving) setModal(null); }} wide>{modal.loading ? <LoadingState label="Loading details…" /> : modal.error ? <ErrorState error={modal.error} onRetry={() => openDetail(modal.mode, { id: modal.id })} /> : modal.mode === 'view' ? <dl className="ad:grid ad:gap-3 ad:sm:grid-cols-2">{detailFields.map((field) => <div key={field.key} className="ad:rounded-2xl ad:border ad:border-slate-100 ad:bg-slate-50/70 ad:p-4"><dt className="ad:text-[11px] ad:font-bold ad:uppercase ad:tracking-[.12em] ad:text-slate-500">{field.label}</dt><dd dir={field.key.startsWith('ar.') || field.key === 'name_ar' ? 'rtl' : 'auto'} className="ad:mt-2 ad:mb-0 ad:break-words ad:text-sm ad:font-medium ad:text-slate-800">{String(getValue(modal.item, field.key) || '—')}</dd></div>)}</dl> : <ResourceForm key={`${resource}-${modal.mode}-${modal.id ?? 'new'}`} fields={modal.mode === 'edit' ? config.editFields || config.createFields : config.createFields} item={modal.item} mode={modal.mode} saving={saving} error={actionError} onCancel={() => setModal(null)} onSubmit={save} />}</Modal> : null}</AnimatePresence>
  </PageMotion>;
}
