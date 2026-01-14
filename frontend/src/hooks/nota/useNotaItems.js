import { useState } from 'react';

const useNotaItems = () => {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        jumlah: 1,
        productId: '',
        priceType: 'tetap',
        search: '',
        isOpen: false,
      },
    ]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id, patch) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  };

  return {
    items,
    addItem,
    removeItem,
    updateItem,
  };
};

export default useNotaItems;
