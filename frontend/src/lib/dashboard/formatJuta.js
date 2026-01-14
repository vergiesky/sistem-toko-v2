const formatJuta = (value) => {
  const juta = Number(value) / 1000000;
  if (!Number.isFinite(juta)) return '0 Jt';
  const rounded = Math.round(juta * 10) / 10;
  const label = Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1);
  return `${label} Jt`;
};

export default formatJuta;
