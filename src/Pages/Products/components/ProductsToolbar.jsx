import { Button, Form } from "react-bootstrap";
import { BsGridFill, BsList } from "react-icons/bs";

const ProductsToolbar = ({ view, onViewChange }) => {
    return (
        <div className="border rounded p-3 mb-3 bg-white">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div>
                    12,911 items in{" "}
                    <span className="fw-bold">Mobile accessory</span>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-3">
                    <Form.Check
                        type="checkbox"
                        id="products-verified-only"
                        label="Verified only"
                        defaultChecked
                    />

                    <Form.Select
                        className="w-auto"
                        defaultValue="Featured"
                        aria-label="Sort products"
                    >
                        <option>Featured</option>
                        <option>Newest</option>
                        <option>Lowest price</option>
                        <option>Highest price</option>
                    </Form.Select>

                    <div>
                        <Button
                            variant={
                                view === "grid" ? "secondary" : "outline-secondary"
                            }
                            onClick={() => onViewChange("grid")}
                            className="rounded-end-0"
                            aria-label="Grid view"
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
                            aria-label="List view"
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
