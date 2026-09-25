import { FaRegHeart } from "react-icons/fa";
import SecondButton from "./SecondButton";
import { NavLink } from "react-router";
import Button from "../ui/Button"
import { CartApi } from "../../services/CartApi";
import { useContext, useState } from "react";
import { CartContext } from "../../Contexts/CartContext";
const ProductCard = ({ product, view }) => {

    const { setCart } = useContext(CartContext);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(null)

    const handleAddingCart = () => {
        setError(false);
        setIsSaving(true);

        CartApi.AddCartService({
            productId: product.id,
            quantity: 1,
        })
            .then((response) => {
                const addedCartItem = response.data;

                setCart((previousCart) => {
                    const updatedCart = [...previousCart, addedCartItem];

                    sessionStorage.setItem("userCart", JSON.stringify(updatedCart));

                    return updatedCart;
                });
            })
            .catch((err) => {
                console.log(err)
                setError(err.message)
            })
            .finally(() => {
                setIsSaving(false)
            })
    }

    if (view === "grid") {
        return (
            <div className="ui-card border bg-white rounded-2 h-100 overflow-hidden">
                <div
                    className="d-flex align-items-center justify-content-center p-3"
                    style={{ height: "220px" }}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid h-100 object-fit-contain"
                    />
                </div>

                <div className="border-top p-3">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                        <div>
                            <div>
                                <span className="fw-bold fs-5">
                                    ${product.price.toFixed(2)}
                                </span>

                                {product.oldPrice && (
                                    <span className="text-secondary text-decoration-line-through ms-2 small">
                                        ${product.oldPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <div className="d-flex align-items-center gap-2 mt-2">
                                <span className="text-warning">★★★★★</span>
                                <span className="text-warning small">
                                    {product.rating}
                                </span>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            <SecondButton value={<FaRegHeart />} />
                        </div>
                    </div>

                    <p className="text-secondary mt-2 mb-0">{product.name}</p>
                    <Button
                        value={isSaving ? "Added" : "Add to cart"}
                        className="mt-3 my-2"
                        onClick={handleAddingCart}
                    />
                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}
                    <NavLink
                        to={`/products/${product.id}`}
                        className="text-danger text-decoration-none fw-semibold"
                    >
                        View details
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="ui-card border p-3 bg-white rounded-2 d-flex gap-4 mb-3 position-relative">
            <div className="position-absolute top-0 end-0 m-3 z-1">
                <SecondButton value={<FaRegHeart />} />
            </div>

            <div className="flex-shrink-0">
                <img
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-fit-contain"
                />
            </div>

            <div className="d-flex flex-column w-100 pe-5">
                <p className="mb-2">{product.name}</p>

                <div className="mb-2">
                    <span className="fw-bold fs-5">
                        ${product.price.toFixed(2)}
                    </span>

                    {product.oldPrice && (
                        <span className="text-secondary text-decoration-line-through ms-2">
                            ${product.oldPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className="d-flex flex-wrap gap-2 mb-2">
                    <span className="text-warning">★★★★★</span>
                    <span className="text-warning">{product.rating}</span>
                    <span className="text-secondary">•</span>
                    <span className="text-secondary">
                        {product.orders} orders
                    </span>
                    <span className="text-secondary">•</span>
                    <span className="text-success">{product.shipping}</span>
                </div>

                <p className="text-secondary mb-2">{product.description}</p>

                <div className="d-flex gap-4 align-items-center">
                    <NavLink
                        to={`/products/${product.id}`}
                        className="text-danger text-decoration-none fw-semibold"
                    >
                        View details
                    </NavLink>
                    <Button
                        value={isSaving ? "Added" : "Add to cart"}
                        className="mt-3 my-2 w-auto"
                        onClick={handleAddingCart}
                    />
                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
