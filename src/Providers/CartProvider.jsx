import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Contexts/CartContext";
import { AuthContext } from "../Contexts/AuthContext";
import { CartService } from "../services/CartService";

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user || !token) {
      return;
    }

    CartService.GetCartApi()
      .then((data) => {
        console.log("GET CART RESPONSE:", data);
        setCart(Array.isArray(data.data) ? data.data : []);
      })
      .catch((err) => {
        console.log("GET CART ERROR:", err);
        setCart([]);
      })
      .finally(() => {
        setIsCartLoading(false);
      });
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, setCart, isCartLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;