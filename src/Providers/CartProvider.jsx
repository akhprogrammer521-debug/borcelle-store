import { useState } from "react";
import { CartContext } from "../Contexts/CartContext";

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const cartInStorage = sessionStorage.getItem("userCart");
        if (!cartInStorage) return [];

        const parsedCart = JSON.parse(cartInStorage);

        return Array.isArray(parsedCart) ? parsedCart : [];
    });

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;