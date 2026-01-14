export function formatRupiah(value) {
  let num = 0;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (/^\d+(\.\d{1,3})$/.test(trimmed)) {
      num = Number(trimmed) || 0;
    } else if (/^\d{1,3}(\.\d{3})+$/.test(trimmed)) {
      num = Number(trimmed.replace(/\./g, '')) || 0;
    } else {
      const normalized = trimmed.replace(/[^0-9-]/g, '');
      num = Number(normalized) || 0;
    }
  } else {
    num = Number(value) || 0;
  }
  const scaled = Number.isInteger(num) ? num : Math.round(num * 1000);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(scaled);
}

export default formatRupiah;
