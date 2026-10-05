import Button from './Button';

export default function Pagination({ page, data, onPageChange }) {
  if (!data) return null;
  const canPrevious = page > 1 && (data.lastPage !== null || Boolean(data.previous));
  const canNext = data.lastPage !== null ? page < data.lastPage : Boolean(data.next);
  return (
    <div className="ad:mt-5 ad:flex ad:flex-wrap ad:items-center ad:justify-between ad:gap-3 ad:rounded-2xl ad:border ad:border-slate-100 ad:bg-white ad:px-5 ad:py-4 ad:text-sm ad:text-slate-500 ad:shadow-sm">
      <span>{data.total !== null ? `${data.total} total records` : 'Total unavailable'}{data.lastPage === null && !data.next && data.items.length > 0 ? ' · Pagination metadata unavailable' : ''}</span>
      <div className="ad:flex ad:items-center ad:gap-3">
        <Button onClick={() => onPageChange(page - 1)} disabled={!canPrevious}>Previous</Button>
        <span className="ad:whitespace-nowrap ad:rounded-xl ad:bg-rose-50 ad:px-3 ad:py-2 ad:font-semibold ad:text-rose-600">Page {page}{data.lastPage ? ` of ${data.lastPage}` : ''}</span>
        <Button onClick={() => onPageChange(page + 1)} disabled={!canNext}>Next</Button>
      </div>
    </div>
  );
}
