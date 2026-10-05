import { useState } from 'react';
import { FiCheck, FiInfo } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Button from './Button';
import { formValue, setNestedValue } from '../utils/resourceConfig';

const fieldClass = 'ad:mt-2 ad:w-full ad:rounded-xl ad:border ad:border-slate-200 ad:bg-white ad:px-3.5 ad:py-3 ad:text-sm ad:text-slate-800 ad:shadow-sm ad:outline-none ad:transition-all ad:duration-200 ad:ease-out ad:focus:border-rose-400 ad:focus:ring-4 ad:focus:ring-rose-100';

export default function ResourceForm({ fields, item, mode, saving, error, onCancel, onSubmit }) {
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((field) => [field.key, item ? formValue(item, field.key) : ''])));
  const [invalid, setInvalid] = useState({});

  function update(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
    setInvalid((current) => ({ ...current, [key]: '' }));
  }

  function submit(event) {
    event.preventDefault();
    const body = {};
    fields.forEach((field) => {
      const value = values[field.key].trim();
      if (mode === 'edit' && value === formValue(item, field.key)) return;
      if (mode === 'edit' && !value && !formValue(item, field.key)) return;
      setNestedValue(body, field.key, field.type === 'number' && value !== '' ? Number(value) : value);
    });
    onSubmit(body);
  }

  return <form id="admin-resource-form" onSubmit={submit} onInvalid={(event) => { const key = event.target.name; setInvalid((current) => ({ ...current, [key]: event.target.validationMessage })); toast.error('Please review the highlighted fields', { id: 'admin-form-validation' }); }}>
    <div className="ad:mb-6 ad:flex ad:items-start ad:gap-3 ad:rounded-2xl ad:border ad:border-rose-100 ad:bg-rose-50/60 ad:px-4 ad:py-3"><FiInfo size={17} className="ad:mt-0.5 ad:shrink-0 ad:text-rose-500" /><p className="ad:m-0 ad:text-xs ad:leading-5 ad:text-slate-600">Fields marked with * are required. Changes are sent to the admin API when you save.</p></div>
    <div className="ad:grid ad:gap-x-5 ad:gap-y-5 ad:sm:grid-cols-2">{fields.map((field) => <label key={field.key} className={`ad:block ${field.type === 'textarea' ? 'ad:sm:col-span-2' : ''}`}><span className="ad:text-[13px] ad:font-semibold ad:text-slate-700">{field.label}{mode === 'create' && field.required && <span className="ad:ml-1 ad:text-rose-500">*</span>}</span>{field.type === 'textarea' ? <textarea name={field.key} value={values[field.key]} onChange={(event) => update(field.key, event.target.value)} onBlur={(event) => { if (event.target.required && !event.target.value) setInvalid((current) => ({ ...current, [field.key]: 'This field is required.' })); }} required={mode === 'create' && field.required} aria-invalid={Boolean(invalid[field.key])} dir={field.key.startsWith('ar.') ? 'rtl' : 'auto'} rows={3} className={`${fieldClass} ad:resize-y ${invalid[field.key] ? 'ad:border-red-300 ad:ring-2 ad:ring-red-100' : ''}`} /> : <input name={field.key} type={field.type} step={field.step} min={field.type === 'number' ? 0 : undefined} value={values[field.key]} onChange={(event) => update(field.key, event.target.value)} onBlur={(event) => { if (event.target.required && !event.target.value) setInvalid((current) => ({ ...current, [field.key]: 'This field is required.' })); }} required={mode === 'create' && field.required} aria-invalid={Boolean(invalid[field.key])} dir={field.key.startsWith('ar.') ? 'rtl' : 'auto'} className={`${fieldClass} ${invalid[field.key] ? 'ad:border-red-300 ad:ring-2 ad:ring-red-100' : ''}`} />}{invalid[field.key] ? <span role="alert" className="ad:mt-1.5 ad:block ad:text-xs ad:text-red-600">{invalid[field.key]}</span> : field.hint && <span className="ad:mt-1.5 ad:block ad:text-xs ad:text-slate-500">{field.hint}</span>}</label>)}</div>
    {error && <p role="alert" className="ad:mt-5 ad:rounded-xl ad:border ad:border-red-100 ad:bg-red-50 ad:p-3 ad:text-sm ad:text-red-700">{error}</p>}
    <div className="ad:mt-7 ad:flex ad:flex-wrap ad:justify-end ad:gap-2 ad:border-t ad:border-slate-100 ad:pt-5"><Button onClick={onCancel}>Cancel</Button><Button type="submit" variant="primary" disabled={saving}><FiCheck size={16} />{saving ? 'Saving…' : mode === 'create' ? 'Create' : 'Save changes'}</Button></div>
  </form>;
}
