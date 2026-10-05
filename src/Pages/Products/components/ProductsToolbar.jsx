import { Button, Form } from "react-bootstrap";
import { BsGridFill, BsList } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const ProductsToolbar = ({ totalProducts, view, onViewChange }) => {
  const { t } = useTranslation();

    return (
        <div className="border rounded p-3 mb-3 bg-white">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div>
                   <span className="fw-bold">{totalProducts}</span>
                    {" "}
                    <span className="fw-bold">{t("products.mobileAccessory")}</span>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-3">
                    <Form.Check
                        type="checkbox"
                        id="products-verified-only"
                        label={t("products.verifiedOnly")}
                        defaultChecked
                    />

                    <Form.Select
                        className="w-auto"
                        defaultValue="Featured"
                        aria-label={t("products.sortProducts")}
                    >
                        <option>{t("products.featured")}</option>
                        <option>{t("products.newest")}</option>
                        <option>{t("products.lowestPrice")}</option>
                        <option>{t("products.highestPrice")}</option>
                    </Form.Select>

                    <div>
                        <Button
                            variant={
                                view === "grid" ? "secondary" : "outline-secondary"
                            }
                            onClick={() => onViewChange("grid")}
                            className="rounded-end-0"
                            aria-label={t("products.gridView")}
                            aria-pressed={view === "grid"}
                        >
                            <BsGridFill />
                        </Button>

                        <Button
                            variant={
                                view === "list" ? "secondary" : "outline-secondary"
                            }
                            onClick={() => onViewChange("list")}
                            className="rounded-start-0"
                            aria-label={t("products.listView")}
                            aria-pressed={view === "list"}
                        >
                            <BsList />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsToolbar;
