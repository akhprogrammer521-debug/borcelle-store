import { useContext, useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import AdminTable from "../Components/AdminTable";
import DetailsModal from "../Components/DetailsModal";
import { AdminCategoriesService } from "../../services/admin/AdminCategoriesService";
import { AdminAuthContext } from "../Contexts/AdminAuthContext";

const emptyForm = { ar: "", en: "" };

export default function Categories() {
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
        AdminCategoriesService.GetCategoriesApi(page, perPage)
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
    setFormLoading(false);
    setFormError("");
    setFieldErrors({});
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setFormLoading(true);
    setFormError("");
    setFieldErrors({});
    setShowForm(true);

    AdminCategoriesService.GetCategoryByIdApi(item.id)
      .then((data) => {
        if (!data.data) throw new Error("بيانات الصنف غير متاحة");
        const category = data.data;
        const values = {
          ar: category.ar?.name ??
            category.translations?.find?.((t) => t.locale === "ar")?.name ?? "",
          en: category.en?.name ??
            category.translations?.find?.((t) => t.locale === "en")?.name ?? "",
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

    AdminCategoriesService.GetCategoryByIdApi(item.id)
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
    ["ar", "en"].forEach((language) => {
      if (!editId || form[language] !== original[language]) {
        changes[language] = { name: form[language] };
      }
    });

    if (!Object.keys(changes).length) {
      setFormError("لم تُجرِ أي تعديل");
      return;
    }

    setSaving(true);
    setFormError("");
    setFieldErrors({});

    const request = editId
      ? AdminCategoriesService.UpdateCategoryApi(editId, changes)
      : AdminCategoriesService.AddCategoryApi(changes);

    request
      .then(() => {
        setShowForm(false);
        setSuccess(editId ? "تم تعديل الصنف" : "تمت إضافة الصنف");
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

    return AdminCategoriesService.DeleteCategoryApi(id)
      .then(() => {
        setSuccess("تم حذف الصنف");
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
    { key: "id", label: "#" },
    {
      key: "name", label: "الصنف",
      render: (item) => item.ar?.name || item.name || item.en?.name || "—",
    },
    {
      key: "english", label: "الاسم بالإنجليزية",
      render: (item) => item.en?.name ||
        item.translations?.find?.((t) => t.locale === "en")?.name || "—",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="admin-page-heading">
        <div><h2>الأصناف</h2><p>تنظيم أصناف المتجر وترجماتها</p></div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <FiPlus /> إضافة صنف
        </button>
      </div>

      {success && <div className="admin-success" role="status">{success}</div>}

      <AdminTable
        columns={columns} rows={items} loading={loading} error={error}
        meta={meta} page={page} perPage={perPage}
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
          <Modal.Title>{editId ? "تعديل الصنف" : "إضافة صنف"}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSave}>
          <Modal.Body>
            {formError && <div className="admin-alert">{formError}</div>}
            {Object.entries(fieldErrors).map(([key, messages]) => (
              <p className="admin-error-text" key={key}>
                {key}: {Array.isArray(messages) ? messages.join("، ") : messages}
              </p>
            ))}
            {formLoading ? <Spinner size="sm" /> :
              ["ar", "en"].map((language) => (
                <div className="mb-3" key={language}>
                  <label className="form-label">
                    {language === "ar" ? "الاسم بالعربية" : "الاسم بالإنجليزية"}
                  </label>
                  <input className="form-control" required
                    dir={language === "ar" ? "rtl" : "ltr"}
                    value={form[language]}
                    onChange={(e) => setForm({
                      ...form, [language]: e.target.value,
                    })} />
                </div>
              ))
            }
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

      <DetailsModal {...details} title="تفاصيل الصنف"
        onHide={() => setDetails({ ...details, show: false })} />
    </motion.div>
  );
}