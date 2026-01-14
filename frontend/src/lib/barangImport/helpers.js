import ExcelJS from 'exceljs';

export const readExcelFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result);
    reader.onerror = () => reject(new Error('Gagal membaca file.'));
    reader.readAsArrayBuffer(file);
  });

export const readWorkbookFromFile = async (file) => {
  const buffer = await readExcelFile(file);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  return workbook;
};

export const getFileExtension = (fileName) => {
  const parts = String(fileName || '').toLowerCase().split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
};

export const normalizeCellValue = (value) => {
  if (value && typeof value === 'object') {
    if (value.text) return value.text;
    if (value.richText) {
      return value.richText.map((item) => item.text).join('');
    }
    if (value.formula && value.result !== undefined) return value.result;
    if (value.result !== undefined) return value.result;
    if (value.value !== undefined) return value.value;
  }
  return value ?? '';
};

export const readRowsFromWorksheet = (worksheet) => {
  if (!worksheet) return [];
  const rows = [];
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    const values = row.values.slice(1).map((cell) => normalizeCellValue(cell));
    rows.push(values);
  });
  return rows;
};

export const parseCsvRows = (text) => {
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          value += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        value += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(value);
      value = '';
    } else if (char === '\n') {
      row.push(value);
      rows.push(row);
      row = [];
      value = '';
    } else if (char !== '\r') {
      value += char;
    }
  }

  row.push(value);
  rows.push(row);
  return rows.filter((item) => item.some((cell) => String(cell).trim() !== ''));
};

export const readRowsFromFile = async (file) => {
  const buffer = await readExcelFile(file);
  const extension = getFileExtension(file.name);

  if (extension === 'csv') {
    const text = new TextDecoder('utf-8').decode(buffer);
    return parseCsvRows(text);
  }

  if (extension === 'xlsx') {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    return readRowsFromWorksheet(workbook.worksheets[0]);
  }

  throw new Error('Format file tidak didukung. Gunakan .xlsx atau .csv.');
};

export const normalizeHeader = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

export const normalizeSheetName = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const findWorksheet = (workbook, aliases) => {
  const aliasSet = new Set(aliases.map((alias) => normalizeSheetName(alias)));
  return workbook.worksheets.find((worksheet) =>
    aliasSet.has(normalizeSheetName(worksheet.name)),
  );
};

export const parseNumber = (value) => {
  if (typeof value === 'number') return value;
  const cleaned = String(value || '').replace(/,/g, '').trim();
  if (cleaned === '') return '';
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : '';
};

export const parseBarangRows = (rows) => {
  if (!rows.length) return [];
  const headers = rows[0].map((header) => normalizeHeader(header));
  const headerMap = {
    nama_barang: ['nama barang', 'nama barang', 'nama_barang', 'nama_barang'],
    stok: ['stok', 'stock'],
    harga_tetap: ['harga tetap', 'harga_tetap', 'harga tetap (rp)'],
    nama_customer: [
      'nama customer (opsional)',
      'nama customer',
      'nama pelanggan',
      'customer',
    ],
    harga_khusus: [
      'harga khusus',
      'harga_khusus',
      'harga khusus (rp)',
    ],
  };

  const indexFor = (keys) =>
    keys.reduce((found, key) => {
      if (found !== -1) return found;
      return headers.indexOf(key);
    }, -1);

  const indexes = {
    nama_barang: indexFor(headerMap.nama_barang),
    stok: indexFor(headerMap.stok),
    harga_tetap: indexFor(headerMap.harga_tetap),
    nama_customer: indexFor(headerMap.nama_customer),
    harga_khusus: indexFor(headerMap.harga_khusus),
  };

  if (indexes.nama_barang === -1 || indexes.stok === -1 || indexes.harga_tetap === -1) {
    throw new Error(
      'Format kolom tidak sesuai. Wajib: Nama Barang, Stok, Harga Tetap.',
    );
  }

  return rows.slice(1).map((row) => ({
    nama_barang: String(row[indexes.nama_barang] || '').trim(),
    stok: parseNumber(row[indexes.stok]),
    harga_tetap: parseNumber(row[indexes.harga_tetap]),
    nama_customer:
      indexes.nama_customer === -1
        ? ''
        : String(row[indexes.nama_customer] || '').trim(),
    harga_khusus:
      indexes.harga_khusus === -1
        ? ''
        : parseNumber(row[indexes.harga_khusus]),
  }));
};

export const parseBarangSheet = (rows) => {
  if (!rows.length) return [];
  const headers = rows[0].map((header) => normalizeHeader(header));
  const headerMap = {
    nama_barang: ['nama barang', 'nama barang', 'nama_barang', 'nama_barang'],
    stok: ['stok', 'stock'],
    harga_tetap: ['harga tetap', 'harga_tetap', 'harga tetap (rp)'],
  };

  const indexFor = (keys) =>
    keys.reduce((found, key) => {
      if (found !== -1) return found;
      return headers.indexOf(key);
    }, -1);

  const indexes = {
    nama_barang: indexFor(headerMap.nama_barang),
    stok: indexFor(headerMap.stok),
    harga_tetap: indexFor(headerMap.harga_tetap),
  };

  if (indexes.nama_barang === -1 || indexes.stok === -1 || indexes.harga_tetap === -1) {
    throw new Error(
      'Format kolom Sheet Barang tidak sesuai. Wajib: Nama Barang, Stok, Harga Tetap.',
    );
  }

  return rows.slice(1).map((row) => ({
    nama_barang: String(row[indexes.nama_barang] || '').trim(),
    stok: parseNumber(row[indexes.stok]),
    harga_tetap: parseNumber(row[indexes.harga_tetap]),
  }));
};

export const parseHargaKhususRows = (rows) => {
  if (!rows.length) return [];
  const headers = rows[0].map((header) => normalizeHeader(header));
  const headerMap = {
    nama_barang: ['nama barang', 'nama barang', 'nama_barang', 'nama_barang'],
    nama_customer: ['nama customer', 'nama pelanggan', 'customer'],
    harga_khusus: ['harga khusus', 'harga_khusus', 'harga khusus (rp)'],
  };

  const indexFor = (keys) =>
    keys.reduce((found, key) => {
      if (found !== -1) return found;
      return headers.indexOf(key);
    }, -1);

  const indexes = {
    nama_barang: indexFor(headerMap.nama_barang),
    nama_customer: indexFor(headerMap.nama_customer),
    harga_khusus: indexFor(headerMap.harga_khusus),
  };

  if (
    indexes.nama_barang === -1 ||
    indexes.nama_customer === -1 ||
    indexes.harga_khusus === -1
  ) {
    throw new Error(
      'Format kolom Sheet Harga Khusus tidak sesuai. Wajib: Nama Barang, Nama Customer, Harga Khusus.',
    );
  }

  return rows.slice(1).map((row) => ({
    nama_barang: String(row[indexes.nama_barang] || '').trim(),
    nama_customer: String(row[indexes.nama_customer] || '').trim(),
    harga_khusus: parseNumber(row[indexes.harga_khusus]),
  }));
};

export const readBarangImportData = async (file) => {
  const extension = getFileExtension(file.name);

  if (extension === 'csv') {
    return {
      format: 'flat',
      rows: await readRowsFromFile(file),
    };
  }

  if (extension === 'xlsx') {
    const workbook = await readWorkbookFromFile(file);
    const barangSheet = findWorksheet(workbook, ['barang', 'produk']);
    const hargaSheet = findWorksheet(workbook, [
      'harga khusus',
      'harga_khusus',
      'harga customer',
    ]);

    if (barangSheet && hargaSheet) {
      return {
        format: 'split',
        barangRows: readRowsFromWorksheet(barangSheet),
        hargaRows: readRowsFromWorksheet(hargaSheet),
      };
    }

    return {
      format: 'flat',
      rows: readRowsFromWorksheet(workbook.worksheets[0]),
    };
  }

  throw new Error('Format file tidak didukung. Gunakan .xlsx atau .csv.');
};
