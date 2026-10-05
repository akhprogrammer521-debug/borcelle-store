import { FiTrash2 } from 'react-icons/fi';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmDeleteDialog({ singular, id, error, saving, onClose, onConfirm }) {
  return <Modal title={`Delete ${singular}`} onClose={onClose}>
    <div className="ad:flex ad:items-start ad:gap-4"><span className="ad:grid ad:h-12 ad:w-12 ad:shrink-0 ad:place-items-center ad:rounded-2xl ad:bg-red-50 ad:text-red-600"><FiTrash2 size={22} /></span><div><h3 className="ad:m-0 ad:text-lg ad:font-semibold ad:text-slate-900">Delete this {singular.toLowerCase()}?</h3><p className="ad:mt-2 ad:mb-0 ad:text-sm ad:leading-6 ad:text-slate-500">{singular} #{id} will be permanently removed. This action cannot be undone.</p></div></div>
    {error && <p role="alert" className="ad:mt-5 ad:rounded-xl ad:bg-red-50 ad:p-3 ad:text-sm ad:text-red-700">{error}</p>}
    <div className="ad:mt-8 ad:flex ad:justify-end ad:gap-2"><Button onClick={onClose}>Cancel</Button><Button variant="danger" onClick={onConfirm} disabled={saving}>{saving ? 'Deleting…' : 'Delete'}</Button></div>
  </Modal>;
}
