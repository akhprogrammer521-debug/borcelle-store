import { Modal, Spinner } from "react-bootstrap";

const labels = {
  id: "الرقم",
  name: "الاسم",
  description: "الوصف",
  sku: "رمز المنتج",
  price: "السعر",
  category_id: "رقم الصنف",
  category: "الصنف",
  customer_id: "رقم العميل",
  customer: "العميل",
  address_id: "رقم العنوان",
  address: "العنوان",
  status: "الحالة",
  notes: "الملاحظات",
  total: "الإجمالي",
  quantity: "الكمية",
  items: "العناصر",
  products: "المنتجات",
  created_at: "تاريخ الإنشاء",
  updated_at: "آخر تعديل",
  ar: "العربية",
  en: "الإنجليزية",
  translations: "الترجمات",
};

function DetailsFields({ data }) {
  if (data === null || data === undefined || data === "") return "—";

  if (typeof data !== "object") {
    if (typeof data === "boolean") return data ? "نعم" : "لا";
    return <span>{String(data)}</span>;
  }

  return (
    <div className="admin-details">
      {Object.entries(data).map(([key, value]) => (
        <div className="admin-detail-row" key={key}>
          <strong>{labels[key] || key}</strong>
          <div><DetailsFields data={value} /></div>
        </div>
      ))}
    </div>
  );
}

export default function DetailsModal({
  show,
  onHide,
  title,
  loading,
  error,
  data,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="admin-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="admin-empty"><Spinner size="sm" /> جارٍ التحميل...</div>
        ) : error ? (
          <div className="admin-alert">{error}</div>
        ) : (
          <DetailsFields data={data} />
        )}
      </Modal.Body>
    </Modal>
  );
}