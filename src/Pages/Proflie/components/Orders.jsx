import { BsCaretLeftFill } from "react-icons/bs";
import Layout from "../../../Layouts/ProfileLayout/Layout";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { OrderApi } from "../../../services/OrderApi";
import Button from "../../../Components/ui/Button";
import {
    CancelOrderModal,
    OrderDetailsModal,
} from "../../../Components/ui/Modal";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { t } = useTranslation();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);


    useEffect(() => {
        OrderApi.GetOrdersService()
            .then((data) => {
                console.log("Orders data:", data);
                console.log("Orders data:", data.data);
                setOrders(data.data);
            })
            .catch((err) => {
                console.log("Get orders error:", err.message);
            })
    }, []);

    const pendingOrders = orders.filter(
        (order) => order.status === "PENDING"
    );

    const handleDeleteOrder = (comment) => {
        setIsDeleting(true);

        OrderApi.DeleteOrderService(selectedOrder.id, comment)
            .then(() => {
                setOrders((currentOrders) =>
                    currentOrders.filter((order) => order.id !== selectedOrder.id)
                );

                setShowCancelModal(false);
                setSelectedOrder(null);
            })
            .catch((err) => {
                console.log("Delete order error:", err.message);
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };

    return (
        <>
            <Layout
                headerProfile={
                    <div className="profile-title d-flex align-items-center gap-2">
                        <BsCaretLeftFill size={30} />
                        <span>{t("common.orders")}</span>
                    </div>
                }

                bodyProfile={
                    <div className="overflow-hidden" style={{ maxHeight: "650px" }}>
                        <div className="overflow-auto" style={{ maxHeight: "650px" }}>
                            <div className="px-4 d-flex flex-column gap-3">

                                {pendingOrders.length === 0 ? (
                                    <div className="text-center text-muted m-auto p-5">
                                        {t("validation.noOrdersFound")}
                                    </div>
                                ) : (
                                    <div>
                                        <Row className="d-flex p-3 flex-wrap g-2">
                                            {pendingOrders.map((order) => (
                                                <Col lg={4} key={order.id}>
                                                    <div className="d-flex justify-content-between align-items-center border rounded p-3">
                                                        <div className="d-flex align-items-center">

                                                            <div className="mt-2">
                                                                <strong className="lh-sm">{t("orders.orderNumber", { id: order.id })}</strong>
                                                                <p className="lh-sm">{order.total} AED</p>
                                                                <p className="lh-sm">{t("orders.paymentType")} {order.payment_type}</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column gap-2 ms-auto">
                                                            <Button
                                                                value={t("common.details")}
                                                                onClick={() => {
                                                                    setSelectedOrder(order);
                                                                    setShowDetails(true);
                                                                }}
                                                            />

                                                            <button
                                                                className="btn-del border-0 p-2 rounded-3"
                                                                onClick={() => {
                                                                    setSelectedOrder(order);
                                                                    setShowCancelModal(true);
                                                                }}
                                                            >
                                                                {t("common.delete")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
            />

            <OrderDetailsModal
                show={showDetails}
                order={selectedOrder}
                onClose={() => {
                    setShowDetails(false);
                    setSelectedOrder(null);
                }}
            />

            <CancelOrderModal
                show={showCancelModal}
                isDeleting={isDeleting}
                onClose={() => {
                    setShowCancelModal(false);
                    setSelectedOrder(null);
                }}
                onConfirm={handleDeleteOrder}
            />

        </>
    )
}

export default Orders
