import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiPackage, FiLayers, FiShoppingBag, FiRefreshCw } from "react-icons/fi";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { AdminProductsService } from "../../services/admin/AdminProductsService";
import { AdminCategoriesService } from "../../services/admin/AdminCategoriesService";
import { AdminOrderService } from "../../services/admin/AdminOrderService";
import { AdminAuthContext } from "../Contexts/AdminAuthContext";

export default function Dashboard() {
    const { handleAdminError } = useContext(AdminAuthContext);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [totals, setTotals] = useState({
        products: null, categories: null, orders: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reload, setReload] = useState(0);

    useEffect(() => {
        let active = true;
        Promise.allSettled([
            AdminProductsService.GetProductsApi(1, 50),
            AdminCategoriesService.GetCategoriesApi(1, 50),
            AdminOrderService.GetOrdersApi(1, 50),
        ])
            .then((results) => {
                if (!active) return;

                const [productResult, categoryResult, orderResult] = results;
                const failures = results.filter((result) => result.status === "rejected");

                failures.forEach((result) => handleAdminError(result.reason));
                setError(failures.map((result) => result.reason.message).join("، "));

                const productData = productResult.status === "fulfilled"
                    ? productResult.value : null;
                const categoryData = categoryResult.status === "fulfilled"
                    ? categoryResult.value : null;
                const orderData = orderResult.status === "fulfilled"
                    ? orderResult.value : null;

                setProducts(Array.isArray(productData?.data) ? productData.data : []);
                setOrders(Array.isArray(orderData?.data) ? orderData.data : []);
                setTotals({
                    products: productData?.meta?.total ?? null,
                    categories: categoryData?.meta?.total ?? null,
                    orders: orderData?.meta?.total ?? null,
                });
            })
            .finally(() => active && setLoading(false));

        return () => { active = false; };
    }, [reload, handleAdminError]);

    const statusCounts = {};
    orders.forEach((order) => {
        const status = order.status || "غير محدد";
        statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const statusData = Object.entries(statusCounts).map(([name, value]) => ({
        name, value,
    }));

    const categoryCounts = {};
    products.forEach((product) => {
        const name = product.category?.ar?.name ||
            product.category?.name ||
            `صنف ${product.category_id ?? "غير محدد"}`;
        categoryCounts[name] = (categoryCounts[name] || 0) + 1;
    });

    const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({
        name, count,
    }));

    const dates = {};
    orders.forEach((order) => {
        if (!order.created_at) return;
        const date = new Date(order.created_at);
        if (Number.isNaN(date.getTime())) return;
        const key = date.toISOString().slice(0, 10);
        dates[key] = (dates[key] || 0) + 1;
    });

    const dateData = Object.entries(dates)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, count]) => ({ date, count }));

    const cards = [
        { label: "إجمالي المنتجات", value: totals.products, icon: FiPackage, to: "products" },
        { label: "إجمالي الأصناف", value: totals.categories, icon: FiLayers, to: "categories" },
        { label: "إجمالي الطلبات", value: totals.orders, icon: FiShoppingBag, to: "orders" },
    ];

    const colors = ["#b82035", "#e65c56", "#ef9b80", "#792c48", "#d9b19b"];

    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="admin-page-heading">
                <div><h2>نظرة عامة</h2><p>متابعة بيانات متجر تمكين</p></div>
                <button className="admin-btn admin-btn-light" disabled={loading}
                    onClick={() => setReload((prev) => prev + 1)}>
                    <FiRefreshCw /> تحديث
                </button>
            </div>

            {error && <div className="admin-alert">{error}</div>}

            <div className="row g-3 mb-4">
                {cards.map(({ label, value, icon: Icon, to }) => (
                    <div className="col-md-4" key={to}>
                        <Link to={`/admin/${to}`} className="admin-stat">
                            <span className="admin-stat-icon"><Icon /></span>
                            <div>
                                <span>{label}</span>
                                <strong>{loading ? "..." : value ?? "غير متاح"}</strong>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <p className="admin-muted">
                المخططات التالية تخص البيانات المحمّلة:
                {` ${products.length} منتج و${orders.length} طلب.`}
            </p>

            {loading ? <div className="admin-panel admin-empty">جارٍ تحميل المخططات...</div> : (
                <div className="row g-4">
                    <div className="col-lg-7">
                        <div className="admin-panel admin-chart">
                            <h5>المنتجات حسب الصنف</h5>
                            {categoryData.length ? (
                                <ResponsiveContainer width="100%" height={290}>
                                    <BarChart data={categoryData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Bar dataKey="count" name="المنتجات" fill={colors[0]}
                                            radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : <div className="admin-empty">لا توجد بيانات</div>}
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="admin-panel admin-chart">
                            <h5>حالات الطلبات</h5>
                            {statusData.length ? (
                                <>
                                    <ResponsiveContainer width="100%" height={230}>
                                        <PieChart>
                                            <Pie data={statusData} dataKey="value" nameKey="name"
                                                innerRadius={55} outerRadius={85} paddingAngle={4}>
                                                {statusData.map((item, index) => (
                                                    <Cell key={item.name} fill={colors[index % colors.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="admin-chart-legend">
                                        {statusData.map((item, index) => (
                                            <span key={item.name}>
                                                <i style={{ background: colors[index % colors.length] }} />
                                                {item.name}: {item.value}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : <div className="admin-empty">لا توجد بيانات</div>}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="admin-panel admin-chart">
                            <h5>الطلبات حسب تاريخ الإنشاء</h5>
                            {dateData.length ? (
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={dateData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Bar dataKey="count" name="الطلبات" fill={colors[1]}
                                            radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : <div className="admin-empty">لا توجد تواريخ متاحة</div>}
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}