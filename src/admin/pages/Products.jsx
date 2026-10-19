import { useContext, useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import AdminTable from "../Components/AdminTable";
import DetailsModal from "../Components/DetailsModal";
import { AdminProductsService } from "../../services/admin/AdminProductsService";
import { AdminCategoriesService } from "../../services/admin/AdminCategoriesService";
import { AdminAuthContext } from "../Contexts/AdminAuthContext";

const emptyForm = {
  sku: "",
  category_id: "",
  price: "",
  ar: { name: "", description: "" },
  en: { name: "", description: "" },
};

function productForm(product) {
  const ar = product.ar ||
    product.translations?.find?.((item) => item.locale === "ar") || {};
  const en = product.en ||
    product.translations?.find?.((item) => item.locale === "en") || {};

  return {
    sku: product.sku ?? "",
    category_id: String(product.category_id ?? product.category?.id ?? ""),
    price: String(product.price ?? ""),
    ar: { name: ar.name ?? "", description: ar.description ?? "" },
    en: { name: en.name ?? "", description: en.description ?? "" },
  };
}

export default function Products() {
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

  const [categories, setCategories] = useState([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryLastPage, setCategoryLastPage] = useState(1);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(null);

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!image) {
      return;
    }

    const url = URL.createObjectURL(image);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const [details, setDetails] = useState({
    show: false, loading: false, data: null, error: "",
  });

  useEffect(() => {
    let active = true;

    AdminProductsService.GetProductsApi(page, perPage)
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
  }, [handleAdminError, page, perPage]);

  const loadCategories = (nextPage = 1) => {
    setCategoryLoading(true);
    setCategoryError("");

    AdminCategoriesService.GetCategoriesApi(nextPage, 50)
      .then((data) => {
        const rows = Array.isArray(data.data) ? data.data : [];
        setCategories((prev) => nextPage === 1 ? rows : [...prev, ...rows]);
        setCategoryPage(nextPage);
        setCategoryLastPage(Number(data.meta?.last_page || 1));
      })
      .catch((err) => {
        setCategoryError(err.message);
        handleAdminError(err);
      })
      .finally(() => setCategoryLoading(false));
  };

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setOriginal(emptyForm);
    setFormLoading(false);
    setFormError("");
    setFieldErrors({});
    setShowForm(true);
    loadCategories();
    setImage(null);
    setCurrentImage("");
  };

  const openEdit = (item) => {
    setImage(null);
    setCurrentImage("");
    setEditId(item.id);
    setFormLoading(true);
    setFormError("");
    setFieldErrors({});
    setShowForm(true);
    loadCategories();

    AdminProductsService.GetProductByIdApi(item.id)
      .then((data) => {
        setCurrentImage(data.data.image || "");
        if (!data.data) throw new Error("بيانات المنتج غير متاحة");
        const values = productForm(data.data);
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

    AdminProductsService.GetProductByIdApi(item.id)
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

    if (!editId && !image) {
      setFormError("يرجى اختيار صورة المنتج");
      return;
    }

    const changes = {};

    ["sku", "category_id", "price"].forEach((key) => {
      if (!editId || form[key] !== original[key]) {
        changes[key] = key === "sku" ? form[key] : Number(form[key]);
      }
    });

    ["ar", "en"].forEach((language) => {
      const translation = {};
      ["name", "description"].forEach((key) => {
        if (!editId || form[language][key] !== original[language][key]) {
          translation[key] = form[language][key];
        }
      });
      if (Object.keys(translation).length) changes[language] = translation;
    });

    if (!Object.keys(changes).length) {
      setFormError("لم تُجرِ أي تعديل");
      return;
    }

    setSaving(true);
    setFormError("");
    setFieldErrors({});

    const request = editId
      ? AdminProductsService.UpdateProductApi(editId, changes)
      : AdminProductsService.AddProductApi({
        ...changes,
        image,
      });

    request
      .then(() => {
        setShowForm(false);
        setSuccess(editId ? "تم تعديل المنتج" : "تمت إضافة المنتج");
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
    return AdminProductsService.DeleteProductApi(id)
      .then(() => {
        setSuccess("تم حذف المنتج");
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
      key: "image",
      label: "الصورة",
      render: (item) =>
        item.image ? (
          <img
            src={item.image}
            alt={item.ar?.name || item.name || "صورة المنتج"}
            className="admin-product-image"
            width={50}
          />
        ) : (
          <span className="admin-muted">بلا صورة</span>
        ),
    },
    {
      key: "name", label: "المنتج",
      render: (item) => item.ar?.name || item.name || item.en?.name || "—",
    },
    { key: "sku", label: "SKU" },
    { key: "price", label: "السعر" },
    {
      key: "category", label: "الصنف",
      render: (item) =>
        item.category?.ar?.name || item.category?.name || item.category_id || "—",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="admin-page-heading">
        <div><h2>المنتجات</h2><p>إدارة بيانات المنتجات وترجماتها</p></div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <FiPlus /> إضافة منتج
        </button>
      </div>

      {success && <div className="admin-success" role="status">{success}</div>}

      <AdminTable
        columns={columns}
        rows={items}
        loading={loading}
        error={error}
        meta={meta}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
        onPerPageChange={(value) => { setPerPage(value); setPage(1); }}
        onRetry={() => setReload((prev) => prev + 1)}
        onView={openDetails}
        onEdit={openEdit}
        onDelete={handleDelete}
        deleting={deleting}
      />

      <Modal
        show={showForm}
        onHide={() => !saving && !formLoading && setShowForm(false)}
        centered size="lg"
        backdrop="static"
        className="admin-modal"
      >
        <Modal.Header closeButton={!saving && !formLoading}>
          <Modal.Title>{editId ? "تعديل المنتج" : "إضافة منتج"}</Modal.Title>
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
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">SKU</label>
                  <input className="form-control" required value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">السعر</label>
                  <input type="number" min="0" step="0.01" required
                    className="form-control" value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">الصنف</label>
                  <select className="form-select" required value={form.category_id}
                    onChange={(e) =>
                      setForm({ ...form, category_id: e.target.value })
                    }>
                    <option value="">اختر الصنف</option>
                    {form.category_id &&
                      !categories.some((cat) => String(cat.id) === form.category_id) &&
                      <option value={form.category_id}>صنف #{form.category_id}</option>}
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.ar?.name || cat.name || cat.en?.name || `#${cat.id}`}
                      </option>
                    ))}
                  </select>
                  {categoryError && <small className="admin-error-text">{categoryError}</small>}
                  {(categoryError || categoryPage < categoryLastPage) && (
                    <button type="button" className="admin-text-button"
                      disabled={categoryLoading}
                      onClick={() => loadCategories(categoryError ? categoryPage : categoryPage + 1)}>
                      تحميل المزيد من الأصناف
                    </button>
                  )}
                </div>

                {["ar", "en"].map((language) => (
                  <div className="col-md-6" key={language}>
                    <div className="admin-form-group">
                      <h6>{language === "ar" ? "العربية" : "English"}</h6>
                      <label className="form-label">الاسم</label>
                      <input className="form-control mb-3" required
                        dir={language === "ar" ? "rtl" : "ltr"}
                        value={form[language].name}
                        onChange={(e) => setForm({
                          ...form,
                          [language]: { ...form[language], name: e.target.value },
                        })} />
                      <label className="form-label">الوصف</label>
                      <textarea className="form-control" rows={4}
                        dir={language === "ar" ? "rtl" : "ltr"}
                        value={form[language].description}
                        onChange={(e) => setForm({
                          ...form,
                          [language]: {
                            ...form[language], description: e.target.value,
                          },
                        })} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="col-12">
              <label htmlFor="admin-product-image" className="form-label">
                صورة المنتج
              </label>

              <input
                id="admin-product-image"
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (file && !file.type.startsWith("image/")) {
                    setFormError("يرجى اختيار ملف صورة");
                    event.target.value = "";
                    return;
                  }

                  setImage(file || null);
                }}
              />

              {(imagePreview || currentImage) && (
                <div className="mt-3">
                  <img
                    src={imagePreview || currentImage}
                    alt="معاينة صورة المنتج"
                    className="admin-product-preview"
                  />
                </div>
              )}

              {image && (
                <button
                  type="button"
                  className="admin-text-button"
                  onClick={() => {
                    setImage(null);
                    document.getElementById("admin-product-image").value = "";
                  }}
                >
                  إلغاء الصورة المختارة
                </button>
              )}

              {editId && (
                <small className="admin-muted d-block mt-2">
                  اترك الحقل فارغًا للاحتفاظ بالصورة الحالية.
                </small>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="admin-btn admin-btn-light"
              disabled={saving || formLoading} onClick={() => setShowForm(false)}>
              إلغاء
            </button>
            <button className="admin-btn admin-btn-primary"
              disabled={saving || formLoading || categoryLoading}>
              {saving ? "جارٍ الحفظ..." : "حفظ"}
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      <DetailsModal {...details} title="تفاصيل المنتج"
        onHide={() => setDetails({ ...details, show: false })} />
    </motion.div>
  );
}