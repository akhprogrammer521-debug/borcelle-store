import { useState, useEffect, useContext } from 'react';
import { CartApi } from "../../services/CartApi";
import { ProfileApi } from "../../services/ProfileApi";
import { OrderApi } from "../../services/OrderApi";
import TopNavbar from '../../Components/layouts/Header/TopNavbar';
import Layout from '../../Layouts/PayLayout/Layout';

import Syriatel from '../../assets/logo/Ellipse 11.png';
import MTN from '../../assets/logo/Ellipse 13.png';

import { VscRefresh } from "react-icons/vsc";
import SecondButton from '../../Components/ui/SecondButton';
import LoadingButton from "../../Components/ui/LoadingButton";
import { CartContentSkeleton } from "../../Components/ui/Skeleton";
import SuccessModal from '../../Components/ui/Modal';
import { CartContext } from '../../Contexts/CartContext';
import { useTranslation } from "react-i18next";


const Payment = () => {
  const { t } = useTranslation();

    const { cart, setCart } = useContext(CartContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [address, setAddress] = useState([]);
    const [paymentType, setPaymentType] = useState("CASH");
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        CartApi.GetCartService()
            .then((data) => {
                setOrders(data.data || [])
            })
            .catch((err) => {
                setError(err.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        ProfileApi.GetAddressService()
            .then((data) => {
                setAddress(data.data);
            })
            .catch((err) => {
                console.log("Get address error:", err.message);
            });
    }, []);

    const cartCount = orders.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const handlePaymentConfirmation = () => {
        setError(null);

        if (!selectedAddressId) {
            setError(t("validation.pleaseSelectADeliveryAddress"));
            return;
        }

        setIsVerifying(true);

        const orderData = {
            note: "",
            payment_type: paymentType,
            address_id: Number(selectedAddressId),
            coupon_code: couponCode
        };

        if (cart.length === 0) {
            setError(t("validation.yourCartIsEmptyPleaseAddItems"));
            setIsVerifying(false);
            return;
        }

        else {
            OrderApi.AddOrdersService(orderData)
                .then((data) => {
                    console.log("Order added successfully:", data);
                    setShowSuccess(true);
                    setCart([]);
                })
                .catch((err) => {
                    setError(err.message);
                    console.error("Error adding order:", err.message);
                })
                .finally(() => {
                    setIsVerifying(false);
                });
        }
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        sessionStorage.removeItem("show_success_modal");
    };

    const handleContinue = () => {
        setShowSuccess(false);
        sessionStorage.removeItem("show_success_modal");
    };

    return (
        <>
            <TopNavbar />
            <Layout
                leftContent={
                    <div className="text-start d-flex flex-column gap-4 text-light p-5">
                        <div className="title-payment">
                            <p className="">{t("payment.paymentMethod")}</p>
                            <small >{t("payment.pickYourPaymentMethod")} </small>
                        </div>
                        <div>
                            <form className="d-flex flex-column gap-3">
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="cash">{t("payment.cash")}</label>
                                    <input type="radio"
                                        name="payment"
                                        id="cash"
                                        value="CASH"
                                        checked={paymentType === "CASH"}
                                        onChange={(e) => setPaymentType(e.target.value)} />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="syriatel"> <img src={Syriatel} width={50} alt="syriatel" /> Syriatel</label>
                                    <input type="radio"
                                        name="payment"
                                        id="syriatel"
                                        value="SYRIATEL"
                                        checked={paymentType === "SYRIATEL"}
                                        onChange={(e) => setPaymentType(e.target.value)} />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <label htmlFor="mtn"> <img src={MTN} width={50} alt="mtn" /> MTN </label>
                                    <input type="radio"
                                        name="payment"
                                        id="mtn"
                                        value="MTN"
                                        checked={paymentType === "MTN"}
                                        onChange={(e) => setPaymentType(e.target.value)} />
                                </div>
                                <div>
                                    {
                                        address.length > 0 && (
                                            <div className="d-flex flex-column gap-2">
                                                <label htmlFor="address">{t("payment.deliveryAddress")}</label>
                                                <select className="form-control rounded-2 border-0" id="address"
                                                    value={selectedAddressId}
                                                    onChange={(e) => setSelectedAddressId(e.target.value)}>
                                                    {address.map((addr) => (
                                                        <option key={addr.id} value={addr.id} className="text-dark form-control">
                                                            {addr.street}, {addr.city}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <label htmlFor="">{t("payment.discountCode")}</label>
                                    <div className="d-flex justify-content-between gap-4">
                                        <input
                                            type="text"
                                            className="rounded-2 border-0 form-control"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />                                        <SecondButton className="w-auto rounded-2 border-0" value={<div className="d-flex align-items-center gap-2"><VscRefresh />{t("payment.check")}</div>}> </SecondButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                }
                rightContent={
                    <>
                        <div className="d-flex flex-column gap-4 w-100 py-5 px-2 ">
                            {
                                isLoading
                                    ? <CartContentSkeleton />
                                    : <>
                                        {
                                            orders.map((item) => (
                                                <div className="product-card-item d-flex justify-content-between align-items-center" key={item.id}>
                                                    <div className="product-info d-flex gap-3 align-items-center">
                                                        <div>
                                                            <img src={item.product.image} width={70} alt={item.product.name} />
                                                        </div>
                                                        <div className="fs-6 lh-1">
                                                            <p className="fw-bold">{item.product.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="product-priec-quan d-flex align-items-center gap-2">
                                                        <p className="border rounded-2 px-2">{item.quantity}</p>
                                                        <p>{item.product.price} AED</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                            }
                            <div className="d-flex justify-content-between align-items-center text-secondary fs-5">
                                <p>{t("common.total")}</p>
                                <p>{cartCount.toFixed(3)} AED</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center text-secondary fs-5">
                                <p>{t("common.discount")}</p>
                                <p>0</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center text-secondary fs-5">
                                <p>{t("common.tax")}</p>
                                <p>4.000</p>
                            </div>
                            <div className="border-bottom" />
                            <div className="d-flex justify-content-between align-items-center text-secondary fs-5">
                                <p>{t("payment.netTotal")}</p>
                                <p>{(cartCount + 4.000).toFixed(3)} AED</p>
                            </div>

                            <LoadingButton
                                type="button"
                                onClick={handlePaymentConfirmation}
                                className="auth-primary-btn border-0 w-100 mt-4"
                                isLoading={isVerifying}
                                loadingLabel={t("payment.confirmingPayment")}
                            >
                                {t("payment.confirmPayment")}
                            </LoadingButton>
                            {error && <p className="text-danger mb-0">{error}</p>}

                            {showSuccess && (
                                <SuccessModal
                                value={t("payment.success")}
                                    show={showSuccess}
                                    onClose={handleCloseSuccess}
                                    onContinue={handleContinue}
                                />
                            )}
                        </div>
                    </>
                }
            />

        </>
    )
}

export default Payment
