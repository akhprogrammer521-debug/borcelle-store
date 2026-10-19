import { useState } from "react";
import { Modal, Button, Pagination, Spinner } from "react-bootstrap";
import { FiEye, FiEdit2, FiTrash2, FiRefreshCw } from "react-icons/fi";

export default function AdminTable({
  columns,
  rows,
  loading,
  error,
  meta,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  onRetry,
  onView,
  onEdit,
  onDelete,
  deleting,
}) {
  const [deleteItem, setDeleteItem] = useState(null);

  const currentPage = Number(meta?.current_page || page);
  const lastPage = Number(meta?.last_page || 1);

  const pages = [];
  for (
    let number = Math.max(1, currentPage - 2);
    number <= Math.min(lastPage, currentPage + 2);
    number++
  ) {
    pages.push(number);
  }

  return (
    <div className="admin-panel">
      {error && (
        <div className="admin-alert">
          <span>{error}</span>
          <button className="admin-btn admin-btn-light" onClick={onRetry}>
            <FiRefreshCw /> إعادة المحاولة
          </button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table admin-table align-middle mb-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="admin-empty">
                  <Spinner size="sm" /> جارٍ تحميل البيانات...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="admin-empty">
                  لا توجد بيانات لعرضها
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render
                        ? column.render(row)
                        : String(row[column.key] ?? "—")}
                    </td>
                  ))}

                  <td>
                    <div className="admin-actions">
                      <button
                        className="admin-icon-btn"
                        title="التفاصيل"
                        aria-label="عرض التفاصيل"
                        onClick={() => onView(row)}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="admin-icon-btn"
                        title="تعديل"
                        aria-label="تعديل"
                        onClick={() => onEdit(row)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="admin-icon-btn danger"
                        title="حذف"
                        aria-label="حذف"
                        onClick={() => setDeleteItem(row)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-table-footer">
        <div className="admin-inline">
          <span>عدد العناصر</span>
          <select
            className="form-select admin-page-size"
            value={perPage}
            disabled={loading}
            onChange={(event) => onPerPageChange(Number(event.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>
            الإجمالي: {meta?.total ?? "غير متاح"}
          </span>
        </div>

        <Pagination className="mb-0">
          <Pagination.First
            disabled={loading || currentPage <= 1}
            onClick={() => onPageChange(1)}
          />
          <Pagination.Prev
            disabled={loading || currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          />

          {pages.map((number) => (
            <Pagination.Item
              key={number}
              active={currentPage === number}
              disabled={loading}
              onClick={() => onPageChange(number)}
            >
              {number}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={loading || currentPage >= lastPage}
            onClick={() => onPageChange(currentPage + 1)}
          />
          <Pagination.Last
            disabled={loading || currentPage >= lastPage}
            onClick={() => onPageChange(lastPage)}
          />
        </Pagination>
      </div>

      <Modal
        show={Boolean(deleteItem)}
        onHide={() => !deleting && setDeleteItem(null)}
        centered
        backdrop={deleting ? "static" : true}
        keyboard={!deleting}
        className="admin-modal"
      >
        <Modal.Header closeButton={!deleting}>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          هل تريد حذف العنصر رقم {deleteItem?.id}؟ لا يمكن التراجع عن الحذف.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            disabled={deleting}
            onClick={() => setDeleteItem(null)}
          >
            إلغاء
          </Button>
          <Button
            variant="danger"
            disabled={deleting}
            onClick={() => {
              onDelete(deleteItem.id).then((success) => {
                if (success) setDeleteItem(null);
              });
            }}
          >
            {deleting ? "جارٍ الحذف..." : "حذف"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}