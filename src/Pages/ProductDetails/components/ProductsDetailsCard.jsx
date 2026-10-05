import { useState, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";
import { FavContext } from "../../../Contexts/FavouriteContext";
import { FavouriteService } from "../../../services/FavouriteService";
import {
    Col,
    Container,
    Row,
    Tab,
    Table,
    Tabs,
} from "react-bootstrap";
import {
    BsCart3,
    BsChatLeftText,
    BsCheckLg,
    BsFillHeartFill,
    BsGeoAlt,
    BsStar,
    BsStarFill,
    BsStarHalf,
} from "react-icons/bs";
import { AiOutlineSafety } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
import useFancybox from "../../../Hooks/useFancybox";
import Button from "../../../Components/ui/Button";
import SecondButton from "../../../Components/ui/SecondButton";
import ProductLiked from "./ProductLiked";
import RelatedProducts from "./RelatedProducts";
import { useTranslation } from "react-i18next";
import { FaRegHeart } from "react-icons/fa";

const starValues = [1, 2, 3, 4, 5];

const statisticIcons = {
    reviews: BsChatLeftText,
    sold: BsCart3,
};

const supplierIcons = {
    location: BsGeoAlt,
    verified: AiOutlineSafety,
    shipping: TbWorld,
};

const detailLabelKeys = {
    Price: "price",
    Condition: "condition",
    Material: "material",
    Category: "category",
    Customization: "customization",
    Protection: "protection",
    Warranty: "warranty",
    Style: "style",
    Certificate: "certificate",
    Size: "size",
    Memory: "memory",
    Availability: "availability",
    "Delivery time": "deliveryTime",
    "Shipping cost": "shippingCost",
    Supplier: "supplier",
    Location: "location",
    Status: "status",
};

const ProductsDetailsCard = ({
    product,
    staticProduct,
}) => {
    const { t } = useTranslation();
    const allImages = [product.image, ...(product.images || [])].filter(Boolean);
    const [selectedImage, setSelectedImage] = useState(allImages[0] || "");
    const [fancyboxRef] = useFancybox({});
    const [activeTab, setActiveTab] = useState(staticProduct.tabs[0].id);
    const colors = product.colors || [];
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const isLoggedIn = Boolean(user && token);
    const { favourite, setFavourite } = useContext(FavContext);

    const favouriteItem = favourite.find((item) =>
        isLoggedIn
            ? item.product?.id === product.id
            : item.product_id === product.id
    )

    const handleAddProductToFav = () => {
        if (!isLoggedIn) {
            const addedGuestFavourite = {
                product_id: product.id,
            };

            setFavourite((previousFav) => {
                const updatedFav = [...previousFav, addedGuestFavourite];

                localStorage.setItem("itemFav", JSON.stringify(updatedFav));
                return updatedFav;
            });

            return;
        }

        FavouriteService.AddFavouriteApi({ productId: product.id })
            .then(() => FavouriteService.GetFavouriteApi())
            .then((data) => {
                setFavourite(data.data || []);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const handleRemoveProductFromFav = () => {
        FavouriteService.DeleteFavouriteApi(product.id)
            .then(() => FavouriteService.GetFavouriteApi())
            .then((data) => {
                setFavourite(data.data || []);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <Container fluid="md" className="px-2 px-md-3 py-3">
            <div className="border rounded-3 p-3 bg-white" ref={fancyboxRef}>
                <Row className="g-3">
                    <Col lg={4} md={5}>
                        <div
                            className="border rounded-2 p-3 d-flex justify-content-center align-items-center mb-3 bg-white"
                            style={{ height: "340px" }}
                        >
                            {selectedImage ? (
                                <a
                                    data-fancybox={`product-gallery-${product.id}`}
                                    href={selectedImage}
                                    data-caption={product.name}
                                    className="d-flex justify-content-center align-items-center h-100"
                                >
                                    <img
                                        src={selectedImage}
                                        alt={product.name}
                                        className="img-fluid object-fit-contain"
                                        style={{ maxHeight: "310px" }}
                                    />
                                </a>
                            ) : (
                                <p className="text-secondary mb-0">
                                    {t("productDetails.noImageAvailable")}
                                </p>
                            )}
                        </div>

                        <Row className="g-2">
                            {allImages.map((image) => (
                                <Col key={image} xs={2}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedImage(image)
                                        }
                                        className={`w-100 border rounded-2 p-1 bg-white ${selectedImage === image
                                            ? "border-danger"
                                            : ""
                                            }`}
                                        style={{ height: "52px" }}
                                    >
                                        <img
                                            src={image}
                                            alt={product.name}
                                            className="w-100 h-100 object-fit-contain"
                                        />
                                    </button>
                                </Col>
                            ))}
                        </Row>
                        {allImages
                            .filter((image) => image !== selectedImage)
                            .map((image) => (
                                <a
                                    key={image}
                                    data-fancybox={`product-gallery-${product.id}`}
                                    href={image}
                                    data-caption={product.name}
                                    className="d-none"
                                >
                                    {product.name}
                                </a>
                            ))}
                    </Col>

                    <Col lg={5} md={7}>
                        <div className="d-flex flex-column gap-2">
                            {staticProduct.inStock && (
                                <span className="small fw-semibold text-success">
                                    <BsCheckLg size={20} className="me-1" />
                                    {t("productDetails.inStock")}
                                </span>
                            )}

                            <h1 className="h5 fw-semibold text-dark mb-0">
                                {product.name}
                            </h1>

                            <div className="d-flex flex-wrap align-items-center gap-2 small text-secondary">
                                <span
                                    className="text-warning d-inline-flex gap-1"
                                    aria-label={t("productDetails.ratingOutOfFive", { rating: staticProduct.rating })}
                                >
                                    {starValues.map((star) => (
                                        <span key={star}>
                                            {staticProduct.rating >= star ? (
                                                <BsStarFill />
                                            ) : staticProduct.rating >=
                                                star - 0.5 ? (
                                                <BsStarHalf />
                                            ) : (
                                                <BsStar className="text-secondary" />
                                            )}
                                        </span>
                                    ))}
                                </span>

                                <span className="text-warning fw-semibold">
                                    {staticProduct.rating}
                                </span>

                                {staticProduct.statistics.map((item) => {
                                    const Icon =
                                        statisticIcons[item.icon];

                                    return (
                                        <span
                                            key={item.id}
                                            className="d-inline-flex align-items-center gap-1"
                                        >
                                            <span className="mx-1">•</span>
                                            <Icon />
                                            {t(item.id === "reviews" ? "productDetails.reviewCount" : "productDetails.soldCount", { count: item.count })}
                                        </span>
                                    );
                                })}
                            </div>

                            <div className="bg-warning bg-opacity-10 p-3 rounded-2 mt-2">
                                <div className="fw-bold fs-4 text-danger">
                                    ${Number(product.price).toFixed(2)}
                                </div>
                            </div>

                            <div className="border-bottom py-2">
                                <dl className="row g-2 small mb-0">
                                    <dt className="col-4 fw-normal text-secondary">
                                        {t("productDetails.sKU")}
                                    </dt>
                                    <dd className="col-8 text-dark mb-0">
                                        {product.sku || "-"}
                                    </dd>

                                    <dt className="col-4 fw-normal text-secondary">
                                        {t("common.category")}
                                    </dt>
                                    <dd className="col-8 text-dark mb-0">
                                        {product.category?.name || "-"}
                                    </dd>

                                    <dt className="col-4 fw-normal text-secondary">
                                        {t("productDetails.color")}
                                    </dt>
                                    <dd className="col-8 text-dark mb-0">
                                        {colors.length > 0
                                            ? colors
                                                .map(
                                                    (color) =>
                                                        color.name
                                                )
                                                .join(", ")
                                            : "-"}
                                    </dd>
                                </dl>
                            </div>

                            <p className="text-secondary mb-2">
                                {product.description}
                            </p>


                        </div>
                    </Col>

                    <Col lg={3}>
                        <div className="d-flex flex-column p-3 gap-3 border rounded-2 bg-white">
                            <div className="d-flex align-items-center gap-2">
                                <div
                                    className="rounded-2 bg-info-subtle text-info fw-bold fs-4 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                    }}
                                >
                                    {staticProduct.supplier.avatar}
                                </div>

                                <div className="lh-sm small">
                                    <span className="text-secondary d-block mb-1">
                                        {t("productDetails.supplier")}
                                    </span>
                                    <span className="text-dark">
                                        {staticProduct.supplier.name}
                                    </span>
                                </div>
                            </div>

                            <div className="border-top pt-3 d-flex flex-column gap-2 small">
                                {staticProduct.supplier.features.map(
                                    (item) => {
                                        const Icon =
                                            supplierIcons[item.icon];

                                        return (
                                            <div
                                                key={item.id}
                                                className="d-flex align-items-center gap-2 text-secondary"
                                            >
                                                {item.symbol ? (
                                                    <span>
                                                        {item.symbol}
                                                    </span>
                                                ) : (
                                                    <Icon size={17} />
                                                )}

                                                <span>{item.id === "location" ? item.text : t(`productDetails.supplierFeatures.${item.id}`)}</span>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                            <div className="d-flex gap-2">
                                <Button
                                    value={t("productDetails.sendInquiry")}
                                    loadingLabel={t("productDetails.sending")}
                                />

                                <SecondButton
                                    value={favouriteItem ? <BsFillHeartFill /> : <FaRegHeart />}
                                    onClick={() =>
                                        favouriteItem
                                            ? handleRemoveProductFromFav(favouriteItem)
                                            : handleAddProductToFav()
                                    }
                                    className="btn-cus-secondary-fav w-auto"
                                />
                            </div>
                            <SecondButton value={t("productDetails.sellersProfile")} />
                        </div>
                    </Col>
                </Row>
            </div>

            <Row className="g-3 my-1">
                <Col lg={9}>
                    <div className="border rounded-2 p-3 bg-white">
                        <Tabs
                            activeKey={activeTab}
                            onSelect={setActiveTab}
                            transition={false}
                            id="product-detail-tabs"
                            className="mb-3 flex-nowrap overflow-auto"
                        >
                            {staticProduct.tabs.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    eventKey={tab.id}
                                    title={t(`productDetails.tabs.${tab.id}`)}
                                >
                                    <div className="d-flex flex-column gap-3">
                                        {tab.paragraphs?.map(
                                            (paragraph) => (
                                                <p
                                                    key={paragraph.id}
                                                    className="text-secondary mb-0"
                                                >
                                                    {paragraph.id === "review-info" ? t("productDetails.reviewsUnavailable") : paragraph.text}
                                                </p>
                                            )
                                        )}

                                        {tab.details && (
                                            <Table
                                                bordered
                                                responsive
                                                size="sm"
                                                className="mb-0 small"
                                            >
                                                <tbody>
                                                    {Object.entries(
                                                        tab.details
                                                    ).map(
                                                        ([
                                                            label,
                                                            value,
                                                        ]) => (
                                                            <tr key={label}>
                                                                <th className="bg-light fw-normal text-secondary p-2">
                                                                    {detailLabelKeys[label] ? t(`productDetails.detailLabels.${detailLabelKeys[label]}`) : label}
                                                                </th>
                                                                <td className="text-secondary p-2">
                                                                    {value}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </Table>
                                        )}

                                        {tab.features && (
                                            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                                {tab.features.map(
                                                    (feature) => (
                                                        <li
                                                            key={feature.id}
                                                            className="text-secondary"
                                                        >
                                                            <BsCheckLg className="me-2" />
                                                            {feature.text}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </Tab>
                            ))}
                        </Tabs>
                    </div>
                </Col>

                <Col lg={3}>
                    <div className="border rounded-2 p-3 bg-white">
                        <h2 className="h6 fw-bold mb-3">
                            {t("productDetails.youMayLike")}
                        </h2>

                        <div className="d-flex flex-column gap-3">
                            {staticProduct.likedProducts.map((item) => (
                                <ProductLiked
                                    key={item.id}
                                    {...item}
                                />
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>

            <section className="my-3 p-3 border rounded-2 bg-white">
                <h2 className="h5 fw-bold mb-3">
                    {t("productDetails.relatedProducts")}
                </h2>

                <Row xs={2} sm={3} lg={6} className="g-3">
                    {staticProduct.relatedProducts.map((item) => (
                        <Col key={item.id}>
                            <RelatedProducts {...item} />
                        </Col>
                    ))}
                </Row>
            </section>
        </Container>
    );
};

export default ProductsDetailsCard;
