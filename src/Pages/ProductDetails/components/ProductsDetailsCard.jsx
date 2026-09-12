import { Fragment, useState } from "react";
import { Col, Container, Row, Tab, Table, Tabs } from "react-bootstrap";
import {
    BsCart3,
    BsChatLeftText,
    BsCheckLg,
    BsGeoAlt,
    BsHeart,
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

const ProductsDetailsCard = ({ product }) => {
    const [fancyboxRef] = useFancybox({});
    const [selectedImageId, setSelectedImageId] = useState(product.images[0].id);
    const [activeTab, setActiveTab] = useState(product.tabs[0].id);

    const selectedImage =
        product.images.find((item) => item.id === selectedImageId) ?? product.images[0];
    const firstPrice = product.priceTiers[0];
    const galleryId = `product-gallery-${product.id}`;
    const descriptionId = `product-description-${product.id}`;

    return (
        <Container fluid="md" className="px-2 px-md-3 py-3">
            <div className="border rounded-3 p-3 bg-white" ref={fancyboxRef}>
                <Row className="g-3">
                    <Col lg={4} md={5}>
                        <div
                            className="border rounded-2 p-3 d-flex justify-content-center align-items-center mb-3 bg-white"
                            style={{ height: "340px" }}
                        >
                            <a
                                data-fancybox={galleryId}
                                data-caption={product.title}
                                href={selectedImage.src}
                                aria-label={`Enlarge ${selectedImage.alt}`}
                                className="d-flex h-100 w-100 justify-content-center align-items-center"
                            >
                                <img
                                    src={selectedImage.src}
                                    alt={`${product.title} — ${selectedImage.alt}`}
                                    className="img-fluid object-fit-contain"
                                    style={{ maxHeight: "310px" }}
                                />
                            </a>
                        </div>

                        <Row className="g-2">
                            {product.images.map((item) => (
                                <Col key={item.id} xs={2}>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedImageId(item.id)}
                                        aria-label={`Show ${item.alt}`}
                                        aria-pressed={selectedImage.id === item.id}
                                        className={`w-100 border rounded-2 p-1 bg-white d-flex justify-content-center align-items-center ${
                                            selectedImage.id === item.id ? "border-danger" : ""
                                        }`}
                                        style={{ height: "52px" }}
                                    >
                                        <img
                                            src={item.src}
                                            alt=""
                                            className="w-100 h-100 object-fit-contain"
                                        />
                                    </button>
                                </Col>
                            ))}
                        </Row>

                        {product.images
                            .filter((item) => item.id !== selectedImage.id)
                            .map((item) => (
                                <a
                                    key={item.id}
                                    data-fancybox={galleryId}
                                    data-caption={product.title}
                                    href={item.src}
                                    className="d-none"
                                    aria-hidden="true"
                                    tabIndex={-1}
                                >
                                    {item.alt}
                                </a>
                            ))}
                    </Col>

                    <Col lg={5} md={7}>
                        <div className="d-flex flex-column gap-2">
                            <span className={`small fw-semibold ${product.inStock ? "text-success" : "text-secondary"}`}>
                                {product.inStock && <BsCheckLg size={20} className="me-1" />}
                                {product.inStock ? "In stock" : "Out of stock"}
                            </span>

                            <h1 className="h5 fw-semibold text-dark mb-0">{product.title}</h1>

                            <div className="d-flex flex-wrap align-items-center gap-2 small text-secondary">
                                <span
                                    className="text-warning d-inline-flex gap-1"
                                    role="img"
                                    aria-label={`${product.rating} out of 5 stars`}
                                >
                                    {starValues.map((star) => (
                                        <span key={star} aria-hidden="true">
                                            {product.rating >= star ? (
                                                <BsStarFill />
                                            ) : product.rating >= star - 0.5 ? (
                                                <BsStarHalf />
                                            ) : (
                                                <BsStar className="text-secondary" />
                                            )}
                                        </span>
                                    ))}
                                </span>

                                <span className="text-warning fw-semibold">{product.rating}</span>

                                {product.statistics.map((item) => {
                                    const Icon = statisticIcons[item.icon];

                                    return (
                                        <span key={item.id} className="d-inline-flex align-items-center gap-1">
                                            <span className="mx-1" aria-hidden="true">•</span>
                                            <Icon aria-hidden="true" />
                                            {item.count} {item.label}
                                        </span>
                                    );
                                })}
                            </div>

                            <div className="d-md-none my-1">
                                <span className="fw-bold text-danger fs-4">
                                    ${firstPrice.price.toFixed(2)}
                                </span>
                                <span className="text-secondary small ms-2">({firstPrice.quantity})</span>
                            </div>

                            <div className="d-flex d-md-none align-items-center gap-2 my-2">
                                <div className="grow">
                                    <Button value="Send inquiry" />
                                </div>
                                <button
                                    type="button"
                                    aria-label="Save for later"
                                    className="btn btn-outline-secondary p-2 d-flex align-items-center justify-content-center"
                                    style={{ width: "42px", height: "42px" }}
                                >
                                    <BsHeart size={18} className="text-danger" />
                                </button>
                            </div>

                            <div className="bg-warning bg-opacity-10 p-3 rounded-2 d-none d-md-flex gap-3">
                                {product.priceTiers.map((tier, index) => (
                                    <div
                                        key={tier.id}
                                        className={`flex-fill ${index > 0 ? "border-start ps-3" : ""}`}
                                    >
                                        <div className={`fw-bold fs-5 ${index === 0 ? "text-danger" : "text-dark"}`}>
                                            ${tier.price.toFixed(2)}
                                        </div>
                                        <div className="small text-secondary">{tier.quantity}</div>
                                    </div>
                                ))}
                            </div>

                            {product.detailGroups.map((group) => (
                                <div key={group.id} className="border-bottom py-2">
                                    <dl className="row g-2 small mb-0">
                                        {Object.entries(group.values).map(([label, value]) => (
                                            <Fragment key={label}>
                                                <dt className="col-4 fw-normal text-secondary">{label}</dt>
                                                <dd className="col-8 text-dark mb-0">{value}</dd>
                                            </Fragment>
                                        ))}
                                    </dl>
                                </div>
                            ))}

                            <div className="small text-secondary d-md-none">
                                <p className="mb-1">{product.summary}</p>
                                <a
                                    href={`#${descriptionId}`}
                                    onClick={() => setActiveTab("desc")}
                                    className="text-danger text-decoration-none fw-semibold"
                                >
                                    Read more
                                </a>
                            </div>
                        </div>
                    </Col>

                    <Col lg={3}>
                        <div className="d-flex flex-column p-3 gap-3 border rounded-2 bg-white">
                            <div className="d-flex align-items-center gap-2">
                                <div
                                    className="rounded-2 bg-info-subtle text-info fw-bold fs-4 d-flex align-items-center justify-content-center shrink-0"
                                    style={{ width: "44px", height: "44px" }}
                                    aria-hidden="true"
                                >
                                    {product.supplier.avatar}
                                </div>
                                <div className="lh-sm small">
                                    <span className="text-secondary d-block mb-1">Supplier</span>
                                    <span className="text-dark">{product.supplier.name}</span>
                                </div>
                            </div>

                            <div className="border-top pt-3 d-flex flex-column gap-2 small">
                                {product.supplier.features.map((item) => {
                                    const Icon = supplierIcons[item.icon];

                                    return (
                                        <div key={item.id} className="d-flex align-items-center gap-2 text-secondary">
                                            {item.symbol ? (
                                                <span aria-hidden="true">{item.symbol}</span>
                                            ) : (
                                                <Icon size={17} className="shrink-0" aria-hidden="true" />
                                            )}
                                            <span>{item.text}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="d-flex flex-column gap-2">
                                <Button value="Send inquiry" />
                                <SecondButton value="Seller’s profile" />
                            </div>
                        </div>

                        <div className="text-center mt-3 d-none d-md-block">
                            <SecondButton value={<><BsHeart className="me-2" />Save for later</>} />
                        </div>
                    </Col>
                </Row>
            </div>

            <Row className="g-3 my-1" id={descriptionId}>
                <Col lg={9}>
                    <div className="border rounded-2 p-3 bg-white">
                        <Tabs
                            activeKey={activeTab}
                            onSelect={setActiveTab}
                            transition={false}
                            id={`product-detail-tabs-${product.id}`}
                            className="mb-3 flex-nowrap overflow-auto"
                        >
                            {product.tabs.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    eventKey={tab.id}
                                    title={tab.title}
                                    tabClassName={`text-nowrap ${activeTab === tab.id ? "text-danger" : "text-secondary"}`}
                                >
                                    <div className="d-flex flex-column gap-3">
                                        {tab.paragraphs?.map((paragraph) => (
                                            <p key={paragraph.id} className="text-secondary mb-0">{paragraph.text}</p>
                                        ))}

                                        {tab.details && (
                                            <Row>
                                                <Col xl={8}>
                                                    <Table bordered responsive size="sm" className="mb-0 small">
                                                        <tbody>
                                                            {Object.entries(tab.details).map(([label, value]) => (
                                                                <tr key={label}>
                                                                    <th scope="row" className="bg-light fw-normal text-secondary p-2">{label}</th>
                                                                    <td className="text-secondary p-2">{value}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        )}

                                        {tab.features && (
                                            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                                                {tab.features.map((feature) => (
                                                    <li key={feature.id} className="d-flex align-items-start gap-2 text-secondary">
                                                        <BsCheckLg className="shrink-0 mt-1" aria-hidden="true" />
                                                        <span>{feature.text}</span>
                                                    </li>
                                                ))}
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
                        <h2 className="h6 fw-bold mb-3">You may like</h2>
                        <div className="d-flex flex-column gap-3">
                            {product.likedProducts.map((item) => (
                                <ProductLiked key={item.id} {...item} />
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>

            <section className="my-3 p-3 border rounded-2 bg-white" aria-labelledby={`related-title-${product.id}`}>
                <h2 id={`related-title-${product.id}`} className="h5 fw-bold mb-3">Related products</h2>
                <Row xs={2} sm={3} lg={6} className="g-3">
                    {product.relatedProducts.map((item) => (
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
