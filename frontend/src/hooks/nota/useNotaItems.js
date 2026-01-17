import { useState } from 'react';

const useNotaItems = (initialItems = []) => {
  const [items, setItems] = useState(() => initialItems);

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
    setItems,
    updateItem,
  };
};

export default useNotaItems;
