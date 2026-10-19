import { useContext, useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import AdminTable from "../Components/AdminTable";
import DetailsModal from "../Components/DetailsModal";
import { AdminOrderService } from "../../services/admin/AdminOrderService";
import { AdminAuthContext } from "../Contexts/AdminAuthContext";

const emptyForm = {
    customer_id: "",
    address_id: "",
    status: "",
    notes: "",
};

export default function Orders() {
    const { handleAdminError } = useContext(AdminAuthContext);
    const [items, setItems] = useState([]);
    const [meta, setMeta] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [reload, setReload] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [original, setOriginal] = useState(emptyForm);
    const [formLoading, setFormLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [deleting, setDeleting] = useState(false);
    const [details, setDetails] = useState({
        show: false, loading: false, data: null, error: "",
    });

    useEffect(() => {
        let active = true;
        AdminOrderService.GetOrdersApi(page, perPage)
            .then((data) => {
                if (!active) return;
                setItems(Array.isArray(data.data) ? data.data : []);
                setMeta(data.meta || null);
            })
            .catch((err) => {
                if (!active) return;
                setError(err.message);
                handleAdminError(err);
            })
            .finally(() => active && setLoading(false));

        return () => { active = false; };
    }, [page, perPage, reload, handleAdminError]);

    const openAdd = () => {
        setEditId(null);
        setForm(emptyForm);
        setOriginal(emptyForm);
        setFormError("");
        setFieldErrors({});
        setFormLoading(false);
        setShowForm(true);
    };

    const openEdit = (item) => {
        setEditId(item.id);
        setFormLoading(true);
        setFormError("");
        setFieldErrors({});
        setShowForm(true);

        AdminOrderService.GetOrderByIdApi(item.id)
            .then((data) => {
                if (!data.data) throw new Error("بيانات الطلب غير متاحة");
                const values = {
                    customer_id: String(data.data.customer_id ?? ""),
                    address_id: String(data.data.address_id ?? ""),
                    status: data.data.status ?? "",
                    notes: data.data.notes ?? "",
                };
                setForm(values);
                setOriginal(values);
            })
            .catch((err) => {
                setFormError(err.message);
                handleAdminError(err);
            })
            .finally(() => setFormLoading(false));
    };

    const openDetails = (item) => {
        setDetails({ show: true, loading: true, data: null, error: "" });

        AdminOrderService.GetOrderByIdApi(item.id)
            .then((data) => setDetails({
                show: true, loading: false, data: data.data, error: "",
            }))
            .catch((err) => {
                setDetails({ show: true, loading: false, data: null, error: err.message });
                handleAdminError(err);
            });
    };

    const handleSave = (event) => {
        event.preventDefault();
        if (saving) return;

        const changes = {};

        if (editId) {
            ["status", "notes"].forEach((key) => {
                if (form[key] !== original[key]) changes[key] = form[key];
            });
        } else {
            changes.customer_id = Number(form.customer_id);
            changes.address_id = Number(form.address_id);
            changes.notes = form.notes;
        }

        if (!Object.keys(changes).length) {
            setFormError("لم تُجرِ أي تعديل");
            return;
        }

        setSaving(true);
        setFormError("");
        setFieldErrors({});

        const request = editId
            ? AdminOrderService.UpdateOrderApi(editId, changes)
            : AdminOrderService.AddOrderApi(changes);

        request
            .then(() => {
                setShowForm(false);
                setSuccess(editId ? "تم تعديل الطلب" : "تمت إضافة الطلب");
                setReload((prev) => prev + 1);
            })
            .catch((err) => {
                setFormError(err.message);
                setFieldErrors(err.errors || {});
                handleAdminError(err);
            })
            .finally(() => setSaving(false));
    };

    const handleDelete = (id) => {
        setDeleting(true);
        setError("");

        return AdminOrderService.DeleteOrderApi(id)
            .then(() => {
                setSuccess("تم حذف الطلب");
                if (items.length === 1 && page > 1) setPage(page - 1);
                else setReload((prev) => prev + 1);
                return true;
            })
            .catch((err) => {
                setError(err.message);
                handleAdminError(err);
                return false;
            })
            .finally(() => setDeleting(false));
    };

    const columns = [
        { key: "id", label: "رقم الطلب" },
        {
            key: "customer", label: "العميل",
            render: (item) => item.customer?.name || item.customer_id || "—",
        },
        {
            key: "status", label: "الحالة",
            render: (item) => <span className="admin-badge">{item.status || "—"}</span>,
        },
        { key: "total", label: "الإجمالي" },
        {
            key: "created_at", label: "التاريخ",
            render: (item) => item.created_at
                ? new Date(item.created_at).toLocaleDateString("ar")
                : "—",
        },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="admin-page-heading">
                <div><h2>الطلبات</h2><p>متابعة الطلبات وإدارة حالاتها</p></div>
                <button className="admin-btn admin-btn-primary" onClick={openAdd}>
                    <FiPlus /> إضافة طلب
                </button>
            </div>

            {success && <div className="admin-success" role="status">{success}</div>}

            <AdminTable columns={columns} rows={items} loading={loading}
                error={error} meta={meta} page={page} perPage={perPage}
                onPageChange={setPage}
                onPerPageChange={(value) => { setPerPage(value); setPage(1); }}
                onRetry={() => setReload((prev) => prev + 1)}
                onView={openDetails} onEdit={openEdit}
                onDelete={handleDelete} deleting={deleting}
            />

            <Modal show={showForm} centered backdrop="static"
                className="admin-modal"
                onHide={() => !saving && !formLoading && setShowForm(false)}>
                <Modal.Header closeButton={!saving && !formLoading}>
                    <Modal.Title>{editId ? "تعديل الطلب" : "إضافة طلب"}</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSave}>
                    <Modal.Body>
                        {formError && <div className="admin-alert">{formError}</div>}
                        {Object.entries(fieldErrors).map(([key, messages]) => (
                            <p className="admin-error-text" key={key}>
                                {key}: {Array.isArray(messages) ? messages.join("، ") : messages}
                            </p>
                        ))}

                        {formLoading ? <Spinner size="sm" /> : (
                            <>
                                {!editId && (
                                    <div className="row g-3 mb-3">
                                        {["customer_id", "address_id"].map((key) => (
                                            <div className="col-6" key={key}>
                                                <label className="form-label">
                                                    {key === "customer_id" ? "رقم العميل" : "رقم العنوان"}
                                                </label>
                                                <input type="number" min="1" step="1" required
                                                    className="form-control" value={form[key]}
                                                    onChange={(e) => setForm({
                                                        ...form, [key]: e.target.value,
                                                    })} />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {editId && (
                                    <div className="mb-3">
                                        <label className="form-label">الحالة</label>
                                        <input className="form-control" required dir="ltr"
                                            value={form.status}
                                            onChange={(e) => setForm({
                                                ...form, status: e.target.value,
                                            })} />
                                        <small className="admin-muted">
                                            أدخل حالة يدعمها النظام، مثل processing
                                        </small>
                                    </div>
                                )}

                                <label className="form-label">الملاحظات</label>
                                <textarea className="form-control" rows={4}
                                    value={form.notes}
                                    onChange={(e) => setForm({
                                        ...form, notes: e.target.value,
                                    })} />
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="admin-btn admin-btn-light"
                            disabled={saving || formLoading} onClick={() => setShowForm(false)}>
                            إلغاء
                        </button>
                        <button className="admin-btn admin-btn-primary"
                            disabled={saving || formLoading}>
                            {saving ? "جارٍ الحفظ..." : "حفظ"}
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>

            <DetailsModal {...details} title="تفاصيل الطلب"
                onHide={() => setDetails({ ...details, show: false })} />
        </motion.div>
    );
}