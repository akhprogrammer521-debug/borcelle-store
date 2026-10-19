import { Button, Form } from "react-bootstrap";
import { BsGridFill, BsList } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const ProductsToolbar = ({
    totalProducts,
    view,
    onViewChange,
    orderBy,
    order,
    onSortChange,
}) => {
    const { t } = useTranslation();

    return (
        <div className="border rounded p-3 mb-3 bg-white">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div>
                    <span className="fw-bold">{totalProducts}</span>
                    {" "}
                    <span className="fw-bold">
                        {t("products.mobileAccessory")}
                    </span>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-3">
                    <Form.Select
                        className="w-auto"
                        value={`${orderBy}:${order}`}
                        aria-label="Sort products"
                        onChange={(event) => {
                            const [field, direction] =
                                event.target.value.split(":");

                            onSortChange(field, direction);
                        }}
                    >
                        <option value="created_at:desc">
                            Newest first
                        </option>
                        <option value="created_at:asc">
                            Oldest first
                        </option>
                        <option value="price:asc">
                            Price: Low to High
                        </option>
                        <option value="price:desc">
                            Price: High to Low
                        </option>
                        <option value="name:asc">
                            Name: A to Z
                        </option>
                        <option value="name:desc">
                            Name: Z to A
                        </option>
                    </Form.Select>

                    <div>
                        <Button
                            variant={
                                view === "grid"
                                    ? "secondary"
                                    : "outline-secondary"
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
                                view === "list"
                                    ? "secondary"
                                    : "outline-secondary"
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