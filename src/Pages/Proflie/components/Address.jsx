import { BsCaretLeftFill } from "react-icons/bs";
import Layout from "../../../Layouts/ProfileLayout/Layout";
import Button from "../../../Components/ui/Button";
import { useEffect, useState } from "react";
import { AddressModal } from "../../../Components/ui/Modal";
import { ProfileService } from "../../../services/ProfileService";
import { MdLocationPin } from "react-icons/md";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Address = () => {
  const { t } = useTranslation();

    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveAddress = (formData) => {
        setIsSaving(true);

        const request = selectedAddress
            ? ProfileService.UpdateAddressApi({
                id: selectedAddress.id,
                ...formData,
            })
            : ProfileService.AddAddressApi(formData);

        request
            .then((data) => {
                if (selectedAddress) {
                    setAddress((prev) =>
                        prev.map((addr) =>
                            addr.id === selectedAddress.id
                                ? {
                                    ...addr,
                                    ...(data.data || {}),
                                    ...formData,
                                }
                                : addr
                        )
                    );
                } else {
                    setAddress((prev) => [...prev, data.data]);
                }

                handleCloseModal();
            })
            .catch((err) => {
                console.log("Save address error:", err.message);
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

    useEffect(() => {
        ProfileService.GetAddressApi()
            .then((data) => {
                setAddress(data.data);
            })
            .catch((err) => {
                console.log("Get address error:", err.message);
            });
    }, [setAddress]);

    const handleDeleteAddress = (id) => {
        ProfileService.DeleteAddressApi(id)
            .then(() => {
                setAddress((prev) => prev.filter((addr) => addr.id !== id));
            })
            .catch((err) => {
                console.log("Delete address error:", err.message);
            });
    };

    const handleOpenAddModal = () => {
        setSelectedAddress(null);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedAddress(null);
    };

    const handleEditAddress = (addr) => {
        setSelectedAddress(addr);
        setModalOpen(true);
    };

    return (
        <>
            <Layout
                headerProfile={
                    <div className="profile-title d-flex align-items-center gap-2">
                        <BsCaretLeftFill size={30} />
                        <span>{t("common.address")}</span>
                    </div>
                }
                bodyProfile={
                    <div className="overflow-hidden" style={{ maxHeight: "650px" }}>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex justify-content-end my-3">
                                <Button
                                    value={t("address.addAddress")}
                                    className="w-auto"
                                    onClick={handleOpenAddModal}
                                />
                            </div>
                            {address.length === 0 ? (
                                <div className="text-center text-muted m-auto p-5">
                                    {t("validation.noAddressesFound")}
                                </div>
                            ) : (
                                <div>
                                    <Row className="d-flex p-3 flex-wrap g-2">
                                        {address.map((addr) => (
                                            <Col lg={4} key={addr.id}>
                                                <div className="d-flex justify-content-between align-items-center border rounded p-3">
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <MdLocationPin size={50} className="loc-icon-cus" />
                                                        </div>
                                                        <div className="mt-2">
                                                            <strong className="lh-sm">{addr.name}</strong>
                                                            <p className="lh-sm">{addr.city}, {addr.street}</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-column gap-2 ms-auto">
                                                        <Button value={t("common.edit")} onClick={() => handleEditAddress(addr)} />
                                                        <button className="btn-del border-0 p-2 rounded-3" value={t("common.delete")} onClick={() => handleDeleteAddress(addr.id)} >
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
                }
            />

            <AddressModal
                key={`${selectedAddress?.id || "new-address"}-${modalOpen}`}
                show={modalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveAddress}
                isSaving={isSaving}
                initialData={selectedAddress}
            />
        </>
    );
};

export default Address;
