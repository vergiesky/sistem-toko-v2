import { useState } from 'react';
import { createBarang, getBarangs } from '../../api/apiBarang.js';
import { createBarangHargaCustomer } from '../../api/apiBarangHargaCustomer.js';
import {
  parseHargaKhususRows,
  parseBarangRows,
  parseBarangSheet,
  readBarangImportData,
} from '../../lib/barangImport/helpers.js';
import { toastError, toastSuccess } from '../../lib/toastUtils.js';

const useBarangImport = ({
  customers,
  barangs,
  barangHargaCustomers,
  onRefreshBarangs,
  onRefreshBarangHargaCustomers,
}) => {
  const [importError, setImportError] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const resetImportState = () => {
    setImportError('');
  };

  const handleImportExcel = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImportError('');
    setIsImporting(true);
    try {
      const importData = await readBarangImportData(file);
      const parsedRows =
        importData.format === 'split'
          ? parseBarangSheet(importData.barangRows)
          : parseBarangRows(importData.rows);
      const parsedHargaRows =
        importData.format === 'split'
          ? parseHargaKhususRows(importData.hargaRows)
          : [];

      const barangRows = parsedRows.filter((row) =>
        [row.nama_barang, row.stok, row.harga_tetap]
          .map((value) => String(value || '').trim())
          .some((value) => value !== ''),
      );

      if (barangRows.length === 0) {
        throw new Error('File kosong atau tidak ada data barang.');
      }

      const hargaRows =
        importData.format === 'split'
          ? parsedHargaRows.filter((row) =>
              [row.nama_barang, row.nama_customer, row.harga_khusus]
                .map((value) => String(value || '').trim())
                .some((value) => value !== ''),
            )
          : parsedRows
              .filter(
                (row) =>
                  String(row.nama_customer || '').trim() !== '' ||
                  String(row.harga_khusus || '').trim() !== '',
              )
              .map((row) => ({
                nama_barang: row.nama_barang,
                nama_customer: row.nama_customer,
                harga_khusus: row.harga_khusus,
              }));
      const hargaRowErrorMessage =
        importData.format === 'split'
          ? 'Nama Barang, Nama Customer, dan Harga Khusus wajib diisi di Sheet Harga Khusus.'
          : 'Nama Customer dan Harga Khusus wajib diisi jika salah satunya diisi.';

      const customerByName = customers.reduce((acc, customer) => {
        acc[String(customer.nama_customer || '').toLowerCase()] = customer;
        return acc;
      }, {});

      const barangByName = new Map();
      const allBarangsResponse = await getBarangs({ per_page: 0 });
      const allBarangs = allBarangsResponse?.data ?? barangs;
      allBarangs.forEach((barang) => {
        const key = String(barang.nama_barang || '').trim().toLowerCase();
        if (key) barangByName.set(key, barang);
      });

      const hargaKeySet = new Set(
        barangHargaCustomers.map(
          (item) => `${item.id_barang}:${item.id_customer}`,
        ),
      );

      let createdBarangCount = 0;
      let skippedBarangCount = 0;
      let createdHargaCount = 0;
      let skippedHargaCount = 0;

      for (const row of barangRows) {
        if (
          !row.nama_barang ||
          row.stok === '' ||
          row.harga_tetap === ''
        ) {
          throw new Error(
            'Nama Barang, Stok, dan Harga Tetap wajib diisi di setiap baris.',
          );
        }

        const nameKey = String(row.nama_barang).trim().toLowerCase();
        if (barangByName.has(nameKey)) {
          skippedBarangCount += 1;
          continue;
        }

        const response = await createBarang({
          nama_barang: row.nama_barang,
          stok: row.stok,
          harga_tetap: row.harga_tetap,
        });
        const newBarangId = response?.data?.id_barang;
        if (!newBarangId) {
          throw new Error(`Gagal membuat barang ${row.nama_barang}.`);
        }
        barangByName.set(nameKey, {
          id_barang: newBarangId,
          nama_barang: row.nama_barang,
        });
        createdBarangCount += 1;
      }

      for (const row of hargaRows) {
        if (!row.nama_barang && !row.nama_customer && row.harga_khusus === '') {
          continue;
        }
        if (!row.nama_barang || !row.nama_customer || row.harga_khusus === '') {
          throw new Error(hargaRowErrorMessage);
        }

        const nameKey = String(row.nama_barang).trim().toLowerCase();
        const barang = barangByName.get(nameKey);
        if (!barang) {
          throw new Error(
            `Nama barang "${row.nama_barang}" tidak ditemukan di data barang.`,
          );
        }

        const customerKey = row.nama_customer.toLowerCase();
        const selectedCustomer = customerByName[customerKey];
        if (!selectedCustomer) {
          throw new Error(
            `Customer "${row.nama_customer}" tidak ditemukan di data.`,
          );
        }

        const hargaKey = `${barang.id_barang}:${selectedCustomer.id_customer}`;
        if (hargaKeySet.has(hargaKey)) {
          skippedHargaCount += 1;
          continue;
        }

        await createBarangHargaCustomer({
          id_barang: barang.id_barang,
          id_customer: selectedCustomer.id_customer,
          harga_khusus: row.harga_khusus,
        });
        hargaKeySet.add(hargaKey);
        createdHargaCount += 1;
      }

      toastSuccess(
        `Berhasil mengimpor ${createdBarangCount} barang baru dan ${createdHargaCount} harga khusus. ${skippedBarangCount} barang dilewati, ${skippedHargaCount} harga khusus dilewati.`,
      );
      onRefreshBarangs();
      onRefreshBarangHargaCustomers();
    } catch (error) {
      const message =
        error?.message || 'Gagal mengimpor file. Periksa format Excel.';
      setImportError(message);
      toastError(message);
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  return {
    importError,
    isImporting,
    handleImportExcel,
    resetImportState,
  };
};

export default useBarangImport;
