import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      return Array.isArray(parsedCart)
        ? parsedCart.map((product) => ({
            ...product,
            quantity: Math.max(1, Number(product.quantity) || 1),
          }))
        : [];
    } catch {
      return [];
    }
  });

  // Save cart whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, quantity = 1) {
    const amount = Math.max(1, Math.floor(Number(quantity) || 1));

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (!existing) {
        return [...prev, { ...product, quantity: amount }];
      }

      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + amount }
          : item,
      );
    });
  }

  function updateQuantity(id, quantity) {
    const amount = Math.floor(Number(quantity));

    if (amount <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity: amount } : product,
      ),
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((product) => product.id !== id));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
