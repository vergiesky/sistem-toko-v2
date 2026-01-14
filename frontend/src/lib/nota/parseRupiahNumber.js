const parseRupiahNumber = (value) => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (/^\d+(\.\d{1,3})$/.test(trimmed)) {
      const num = Number(trimmed) || 0;
      return Number.isInteger(num) ? num : Math.round(num * 1000);
    }
    if (/^\d{1,3}(\.\d{3})+$/.test(trimmed)) {
      return Number(trimmed.replace(/\./g, '')) || 0;
    }
    const normalized = trimmed.replace(/[^0-9-]/g, '');
    return Number(normalized) || 0;
  }
  const num = Number(value) || 0;
  return Number.isInteger(num) ? num : Math.round(num * 1000);
};

export default parseRupiahNumber;
