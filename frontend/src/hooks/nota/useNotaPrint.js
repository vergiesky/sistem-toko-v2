import { createNotaWithDetail, getNextNotaNumber } from '../../api/apiNota.js';
import { alertConfirm, alertError, alertWarning } from '../../lib/alert.js';
import formatDateTimeForSql from '../../lib/nota/formatDateTimeForSql.js';

const useNotaPrint = ({
  items,
  getItemUnitPrice,
  selectedCustomer,
  customerSearch,
  notaNumber,
  totalHarga,
  setNotaNumber,
  onAfterPrintSuccess,
}) => {
  const handlePrint = async () => {
    const invalidItem = items.find(
      (item) => !item.productId || Number(item.jumlah) < 1,
    );
    if (invalidItem) {
      await alertWarning(
        'Perhatian',
        'Lengkapi barang dan jumlah sebelum cetak.',
      );
      return;
    }

    if (items.length === 0) {
      await alertWarning(
        'Perhatian',
        'Tambahkan minimal satu barang sebelum cetak.',
      );
      return;
    }

    const payloadItems = items.map((item) => {
      const unitPrice = getItemUnitPrice(item);
      const jumlah = Number(item.jumlah) || 0;
      return {
        id_barang: Number(item.productId),
        jumlah,
        harga_satuan: unitPrice,
        sub_total: jumlah * unitPrice,
      };
    });

    try {
      await createNotaWithDetail({
        id_customer: selectedCustomer?.id_customer ?? null,
        nama_customer: customerSearch.trim() || null,
        tanggal: formatDateTimeForSql(new Date()),
        nomor_nota: Number(notaNumber),
        total: totalHarga,
        items: payloadItems,
      });
    } catch (error) {
      const status = error?.response?.status;
      if (status === 409 && Array.isArray(error?.response?.data?.data)) {
        const detailsHtml = error.response.data.data
          .map(
            (item) =>
              `stok ${item.nama_barang || 'barang'} tidak mencukupi (stok ${item.stok}, jumlah ${item.jumlah})`,
          )
          .join('<br />');
        const confirmResult = await alertConfirm({
          title: 'Stok tidak mencukupi',
          html: `${detailsHtml}<br /><br />Yakin ingin melanjutkan?`,
          confirmButtonText: 'Lanjutkan',
          cancelButtonText: 'Batal',
          icon: 'warning',
        });
        if (!confirmResult.isConfirmed) {
          return;
        }
        try {
          await createNotaWithDetail({
            id_customer: selectedCustomer?.id_customer ?? null,
            nama_customer: customerSearch.trim() || null,
            tanggal: formatDateTimeForSql(new Date()),
            nomor_nota: Number(notaNumber),
            total: totalHarga,
            items: payloadItems,
            allow_negative: true,
          });
        } catch (retryError) {
          const retryMessage =
            retryError?.response?.data?.message ||
            'Gagal menyimpan nota.';
          await alertError('Gagal menyimpan nota', retryMessage);
          return;
        }
      } else {
        const message =
          error?.response?.data?.message || 'Gagal menyimpan nota.';
        await alertError('Gagal menyimpan nota', message);
        return;
      }
    }

    try {
      const response = await getNextNotaNumber();
      setNotaNumber(Number(response.next_number) || 1);
    } catch {
      setNotaNumber((prev) => prev + 1);
    }
    window.print();
    onAfterPrintSuccess?.();
  };

  return { handlePrint };
};

export default useNotaPrint;
