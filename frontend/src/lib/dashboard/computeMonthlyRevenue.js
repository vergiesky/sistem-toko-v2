import formatMonthLabel from './formatMonthLabel.js';
import formatMonthShort from './formatMonthShort.js';

const computeMonthlyRevenue = (notas, months = 6) => {
  const now = new Date();
  const buckets = [];
  const map = {};
  const range = Math.max(1, Number(months) || 1);

  for (let i = range - 1; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}`;
    const label = formatMonthShort(date);
    const labelFull = formatMonthLabel(date);
    buckets.push({ key, label, labelFull, revenue: 0 });
    map[key] = buckets[buckets.length - 1];
  }

  notas.forEach((nota) => {
    const date = new Date(nota.tanggal);
    if (Number.isNaN(date.getTime())) return;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}`;
    if (map[key]) {
      map[key].revenue += Number(nota.total) || 0;
    }
  });

  const rangeLabel = `${buckets[0]?.labelFull || ''} - ${
    buckets[buckets.length - 1]?.labelFull || ''
  }`;

  return { data: buckets, rangeLabel };
};

export default computeMonthlyRevenue;
