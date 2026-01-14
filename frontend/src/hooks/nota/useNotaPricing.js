import { useCallback, useMemo } from 'react';
import parseRupiahNumber from '../../lib/nota/parseRupiahNumber.js';
import splitIntoPages from '../../lib/splitIntoPages.js';

const useNotaPricing = ({
  items,
  barangs,
  barangHargaCustomers,
  selectedCustomer,
  itemsPerPage = 15,
}) => {
  const getItemProduct = useCallback(
    (item) =>
      barangs.find(
        (barang) => String(barang.id_barang) === String(item.productId),
      ),
    [barangs],
  );

  const getItemUnitPrice = useCallback(
    (item) => {
      const product = getItemProduct(item);
      if (!product) return 0;
      if (item.priceType === 'customer' && selectedCustomer) {
        const match = barangHargaCustomers.find(
          (harga) =>
            String(harga.id_barang) === String(product.id_barang) &&
            String(harga.id_customer) === String(selectedCustomer.id_customer),
        );
        if (match) {
          return parseRupiahNumber(match.harga_khusus);
        }
      }
      return parseRupiahNumber(product.harga_tetap);
    },
    [getItemProduct, barangHargaCustomers, selectedCustomer],
  );

  const totalHarga = items.reduce((sum, item) => {
    const jumlah = Number(item.jumlah) || 0;
    return sum + jumlah * getItemUnitPrice(item);
  }, 0);

  const itemPages = useMemo(
    () => splitIntoPages(items, itemsPerPage),
    [items, itemsPerPage],
  );

  const pageTotals = useMemo(
    () =>
      itemPages.map((pageItems) =>
        pageItems.reduce((sum, item) => {
          const jumlah = Number(item.jumlah) || 0;
          const unitPrice = getItemUnitPrice(item);
          return sum + jumlah * unitPrice;
        }, 0),
      ),
    [itemPages, getItemUnitPrice],
  );

  const printPages = useMemo(() => {
    if (itemPages.length === 0) {
      return [
        {
          items: [],
          blanks: Array.from({ length: itemsPerPage }),
        },
      ];
    }
    return itemPages.map((pageItems) => ({
      items: pageItems,
      blanks: Array.from({
        length: Math.max(0, itemsPerPage - pageItems.length),
      }),
    }));
  }, [itemPages, itemsPerPage]);

  return {
    getItemProduct,
    getItemUnitPrice,
    totalHarga,
    pageTotals,
    printPages,
  };
};

export default useNotaPricing;
