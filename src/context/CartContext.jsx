import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const MAX_PRODUCT_QUANTITY = 10;
const QUANTITY_LIMIT_MESSAGE = "Only 10 Available. Your cart was not changed.";

export function CartProvider({ children }) {
  const [cartPrompt, setCartPrompt] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      if (typeof window === "undefined") return [];
      const savedCart = localStorage.getItem("cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      if (!Array.isArray(parsedCart)) return [];

      const validProducts = parsedCart.filter(
        (product) =>
          product &&
          (typeof product.id === "string" || typeof product.id === "number") &&
          typeof product.title === "string" &&
          Number.isFinite(Number(product.price)) &&
          Number(product.price) >= 0,
      );

      return validProducts.reduce((normalized, product) => {
        const quantity = Number(product.quantity);
        const safeQuantity = Math.min(
          MAX_PRODUCT_QUANTITY,
          Math.max(1, Number.isFinite(quantity) ? Math.floor(quantity) : 1),
        );
        const existing = normalized.find((item) => item.id === product.id);
        if (existing) {
          existing.quantity = Math.min(
            MAX_PRODUCT_QUANTITY,
            existing.quantity + safeQuantity,
          );
        } else {
          normalized.push({ ...product, quantity: safeQuantity });
        }
        return normalized;
      }, []);
    } catch {
      return [];
    }
  });

  // Save cart whenever cart changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch {
      // Storage can be unavailable or full; the in-memory cart still works.
    }
  }, [cart]);

  function addToCart(product, quantity = 1) {
    const amount = Math.max(1, Math.floor(Number(quantity) || 1));
    const currentQuantity =
      cart.find((item) => item.id === product.id)?.quantity ?? 0;
    if (currentQuantity + amount > MAX_PRODUCT_QUANTITY) {
      const available = MAX_PRODUCT_QUANTITY - currentQuantity;
      setCartPrompt({
        message:
          available > 0
            ? `Only ${available} more of this product can be added as per current stock. Add ${available}?`
            : QUANTITY_LIMIT_MESSAGE,
        action: { type: "add", product, quantity: available },
        canProceed: available > 0,
      });
      return false;
    }

    setCartPrompt(null);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (!existing) {
        return [...prev, { ...product, quantity: amount }];
      }

      return prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + amount,
            }
          : item,
      );
    });
    return true;
  }

  function updateQuantity(id, quantity) {
    const numericQuantity = Number(quantity);
    if (!Number.isFinite(numericQuantity) || numericQuantity < 1) return;
    const amount = Math.floor(numericQuantity);

    if (amount > MAX_PRODUCT_QUANTITY) {
      const currentQuantity =
        cart.find((product) => product.id === id)?.quantity ?? 0;
      const available = MAX_PRODUCT_QUANTITY - currentQuantity;
      setCartPrompt({
        message:
          available > 0
            ? `Only ${available} more can be added to reach the 10 item limit. Set quantity to 10?`
            : QUANTITY_LIMIT_MESSAGE,
        action: { type: "quantity", id, quantity: MAX_PRODUCT_QUANTITY },
        canProceed: available > 0,
      });
      return;
    }

    setCartPrompt(null);

    setCart((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity: amount } : product,
      ),
    );
  }

  function cancelCartPrompt() {
    setCartPrompt(null);
  }

  function proceedWithCartPrompt() {
    if (!cartPrompt?.canProceed) return false;

    if (cartPrompt.action.type === "add") {
      const { product, quantity } = cartPrompt.action;
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (!existing) return [...prev, { ...product, quantity }];
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      });
    } else {
      const { id, quantity } = cartPrompt.action;
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    }

    const shouldNavigate = cartPrompt.action.type === "add";
    setCartPrompt(null);
    return shouldNavigate;
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((product) => product.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartPrompt,
        cancelCartPrompt,
        proceedWithCartPrompt,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
