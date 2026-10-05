import { BsCaretLeftFill } from "react-icons/bs";
import Layout from "../../../Layouts/ProfileLayout/Layout";
import Button from "../../../Components/ui/Button";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ProductsApi } from "../../../services/ProductsApi";
import { ProductModal } from "../../../Components/ui/Modal";

const MyProducts = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveProduct = (formData) => {
        setIsSaving(true);

        const request = selectedProduct
            ? ProductsApi.UpdateProductService({
                id: selectedProduct.id,
                ...formData,
            })
            : ProductsApi.AddProductService(formData);

        request
            .then((data) => {
                if (selectedProduct) {
                    setProduct((prev) =>
                        prev.map((prod) =>
                            prod.id === selectedProduct.id
                                ? {
                                    ...prod,
                                    ...(data.data || {}),
                                    ...formData,
                                }
                                : prod
                        )
                    );
                } else {
                    setProduct((prev) => [...prev, data.data]);
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
        ProductsApi.GetMyProductsService()
            .then((data) => {
                setProduct(data.data);
            })
            .catch((err) => {
                console.log("Get products error:", err.message);
            });
    }, [setProduct]);

    const handleDeleteProduct = (id) => {
        ProductsApi.DeleteProductService(id)
            .then(() => {
                setProduct((prev) => prev.filter((prod) => prod.id !== id));
            })
            .catch((err) => {
                console.log("Delete address error:", err.message);
            });
        }

        const handleOpenAddModal = () => {
            setSelectedProduct(null);
            setModalOpen(true);
        };

        const handleCloseModal = () => {
            setModalOpen(false);
            setSelectedProduct(null);
        };

        const handleEditProduct = (prod) => {
            setSelectedProduct(prod);
            setModalOpen(true);
        };
        return (
            <>
                <Layout
                    headerProfile={
                        <div className="profile-title d-flex align-items-center gap-2">
                            <BsCaretLeftFill size={30} />
                            <span>My Products</span>
                        </div>
                    }

                    bodyProfile={
                        <div className="overflow-hidden" style={{ maxHeight: "650px" }}>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex justify-content-end my-3">
                                    <Button
                                        value="Add Product"
                                        className="w-auto"
                                        onClick={handleOpenAddModal}
                                    />
                                </div>
                                {product.length === 0 ? (
                                    <div className="text-center text-muted m-auto p-5">
                                        No Products found.
                                    </div>
                                ) : (
                                    <div>
                                        <Row className="d-flex p-3 flex-wrap g-2">
                                            {product.map((prod) => (
                                                <Col lg={3} key={prod.id}>
                                                    <div className="ui-card border bg-white rounded-2 h-100 overflow-hidden">
                                                        <div
                                                            className="d-flex align-items-center justify-content-center p-3"
                                                            style={{ height: "220px" }}
                                                        >
                                                            <img
                                                                src={prod.image || null}
                                                                alt={prod.name || "Product"}
                                                                className="img-fluid h-100 object-fit-contain"
                                                            />
                                                        </div>

                                                        <div className="border-top p-3">
                                                            <div className="d-flex justify-content-between align-items-start gap-2">
                                                                <div>
                                                                    <div>
                                                                        <span className="fw-bold ms-2 small">
                                                                            ${prod.price}
                                                                        </span>
                                                                    </div>

                                                                    <div className="d-flex align-items-center gap-2 mt-2">
                                                                        <span className="fw-bolder">{prod.name}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex gap-2">
                                                                <Button
                                                                    value={"Edit"}
                                                                    className="mt-3 my-2 w-auto"
                                                                    onClick={() => handleEditProduct(prod)}
                                                                />
                                                                <button
                                                                    value={""}
                                                                    className="border-0 p-1 rounded-2 mt-3 my-2 w-auto btn-del"
                                                                    onClick={() => { handleDeleteProduct(prod.id) }}
                                                                >Delete</button>
                                                            </div>
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
                <ProductModal
                    key={selectedProduct?.id || "new-product"}
                    show={modalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveProduct}
                    isSaving={isSaving}
                    initialData={selectedProduct}
                />
            </>
        )
    }

    export default MyProducts
