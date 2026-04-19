import { createContext, useState, useEffect } from 'react';

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  // Load initial bag from local storage if it exists
  const [bagItems, setBagItems] = useState(() => {
    const savedBag = localStorage.getItem('weavora_bag');
    return savedBag ? JSON.parse(savedBag) : [];
  });

  // Save to local storage whenever the bag changes
  useEffect(() => {
    localStorage.setItem('weavora_bag', JSON.stringify(bagItems));
  }, [bagItems]);

  const addToBag = (product, size, qty = 1) => {
    setBagItems((prev) => {
      const existingItem = prev.find((item) => item._id === product._id && item.size === size);
      if (existingItem) {
        // Increase quantity if item & size already exist
        return prev.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      // Add new item
      return [...prev, { ...product, size, qty }];
    });
  };

  const removeFromBag = (productId, size) => {
    setBagItems((prev) => prev.filter((item) => !(item._id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, newQty) => {
    if (newQty < 1) return;
    setBagItems((prev) =>
      prev.map((item) =>
        item._id === productId && item.size === size ? { ...item, qty: newQty } : item
      )
    );
  };

  const clearBag = () => {
    setBagItems([]);
    localStorage.removeItem('weavora_bag');
  };

  return (
    <BagContext.Provider value={{ bagItems, addToBag, removeFromBag, updateQuantity, clearBag }}>
      {children}
    </BagContext.Provider>
  );
};