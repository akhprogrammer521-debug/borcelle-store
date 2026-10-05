import { useContext, useState } from "react";
import { NavLink } from "react-router";

import { AuthContext } from "../../Contexts/AuthContext";
import { CartContext } from "../../Contexts/CartContext";
import { FavContext } from "../../Contexts/FavouriteContext";

import { CartApi } from "../../services/CartApi";
import { FavApi } from "../../services/FavouriteApi";

import { FaRegHeart } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";

import SecondButton from "./SecondButton";
import Button from "./Button"
import { useTranslation } from "react-i18next";

const ProductCard = ({ product, view, showDetails = true }) => {
  const { t } = useTranslation();

    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const isLoggedIn = Boolean(user && token);
    const { cart, setCart } = useContext(CartContext);
    const { favourite, setFavourite } = useContext(FavContext);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(null);

    const handleAddingCart = () => {
        setError(null);

        if (!isLoggedIn) {
            setError(t("validation.pleaseLogInBeforeAddingProductsTo"));
            return;
        }
        setIsSaving(true);

        const existingItem = cart.find(
            (item) => item.product?.id === product.id
        );

        const newQuantity = existingItem
            ? existingItem.quantity + 1
            : 1;

        CartApi.AddCartService({
            productId: product.id,
            quantity: newQuantity,
        })
            .then((response) => {
                const updatedCartItem = response.data;

                setCart((previousCart) => {
                    const productExists = previousCart.some(
                        (item) => item.product?.id === product.id
                    );

                    const updatedCart = productExists
                        ? previousCart.map((item) =>
                            item.product?.id === product.id
                                ? updatedCartItem
                                : item
                        )
                        : [...previousCart, updatedCartItem];

                    // sessionStorage.setItem("userCart", JSON.stringify(updatedCart));
                    return updatedCart;
                });
            })
            .catch((err) => {
                setError(err.message);
            });
    };
    const favouriteItem = favourite.find((item) =>
        isLoggedIn
            ? item.product?.id === product.id
            : item.product_id === product.id
    )

    const handleAddProductToFav = () => {
        setError(null);
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

        FavApi.AddFavouriteService({ productId: product.id })
            .then(() => FavApi.GetFavouriteService())
            .then((data) => {
                setFavourite(data.data || []);
            })
            .catch((err) => {
                setError(err.message);
            });
    }

    const handleRemoveProductFromFav = () => {
        FavApi.RemoveFavouriteService(product.id)
            .then(() => FavApi.GetFavouriteService())
            .then((data) => {
                setFavourite(data.data || []);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    if (view === "grid") {
        return (
            <div className="ui-card border bg-white rounded-2 h-100 overflow-hidden">
                <div
                    className="d-flex align-items-center justify-content-center p-3"
                    style={{ height: "220px" }}
                >
                    <img
                        src={product.image || null}
                        alt={product.name || t("common.product")}
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
                            <SecondButton
                                value={favouriteItem ? <BsFillHeartFill /> : <FaRegHeart />}
                                onClick={() =>
                                    favouriteItem
                                        ? handleRemoveProductFromFav(favouriteItem)
                                        : handleAddProductToFav()
                                }
                                className="btn-cus-secondary-fav"
                            />
                        </div>
                    </div>

                    <p className="text-secondary mt-2 mb-0">{product.name}</p>
                    <Button
                        value={isSaving ? t("common.added") : t("common.addToCart")}
                        className="mt-3 my-2"
                        onClick={handleAddingCart}
                    />
                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}
                    {showDetails && (
                        <NavLink
                            to={`/products/${product.id}`}
                            className="text-danger text-decoration-none fw-semibold d-lg-flex"
                        >
                            {t("common.viewDetails")}
                        </NavLink>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="ui-card border p-3 bg-white rounded-2 d-flex gap-4 mb-3 position-relative">
            <div className="position-absolute top-0 end-0 m-3 z-1">
                <SecondButton
                    value={favouriteItem ? <BsFillHeartFill /> : <FaRegHeart />}
                    onClick={() =>
                        favouriteItem
                            ? handleRemoveProductFromFav(favouriteItem)
                            : handleAddProductToFav()
                    } className="btn-cus-secondary-fav"
                />
            </div>

            <div className="flex-shrink-0">
                <img
                    src={product.image || null}
                    alt={product.name || t("common.product")}
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
                        {t("products.ordersCount", { count: product.orders })}
                    </span>
                    <span className="text-secondary">•</span>
                    <span className="text-success">{product.shipping}</span>
                </div>

                <p className="text-secondary mb-2 d-lg-flex d-none">{product.description}</p>

                <div className="d-flex gap-4 align-items-center">
                    {showDetails && (
                        <NavLink
                            to={`/products/${product.id}`}
                            className="text-danger text-decoration-none fw-semibold d-lg-flex"
                        >
                            {t("common.viewDetails")}
                        </NavLink>
                    )}
                    <Button
                        value={isSaving ? t("common.added") : t("common.addToCart")}
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
