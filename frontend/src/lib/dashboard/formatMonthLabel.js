const formatMonthLabel = (date) =>
  date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });

export default formatMonthLabel;
