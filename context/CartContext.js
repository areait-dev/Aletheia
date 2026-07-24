import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  // Stato di apertura del drawer, condiviso così altri widget (es. Chatbot)
  // possono nascondersi mentre il carrello è aperto.
  const [cartOpen, setCartOpen] = useState(false);

  // Carica carrello da localStorage al mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aletheia_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // Salva carrello su localStorage ad ogni modifica
  useEffect(() => {
    try {
      localStorage.setItem('aletheia_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const addToCart = (item) => {
    // item: { id, slug, title, variant, price }
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
