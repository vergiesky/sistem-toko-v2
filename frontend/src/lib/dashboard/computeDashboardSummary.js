const computeDashboardSummary = (notas) => {
  const totals = {
    totalNota: notas.length,
    totalRevenue: 0,
    totalItems: 0,
    uniqueCustomers: new Set(),
  };
  const productMap = {};

  notas.forEach((nota) => {
    totals.totalRevenue += Number(nota.total) || 0;
    if (nota.id_customer) {
      totals.uniqueCustomers.add(String(nota.id_customer));
    } else if (nota.nama_customer) {
      totals.uniqueCustomers.add(`name:${nota.nama_customer}`);
    }
    const details = nota.detail_notas || nota.detailNotas || [];
    details.forEach((detail) => {
      const jumlah = Number(detail.jumlah) || 0;
      totals.totalItems += jumlah;
      const name = detail.barang?.nama_barang || 'Barang';
      if (!productMap[name]) {
        productMap[name] = 0;
      }
      productMap[name] += jumlah;
    });
  });

  const topProducts = Object.entries(productMap)
    .map(([name, jumlah]) => ({ name, jumlah }))
    .sort((a, b) => b.jumlah - a.jumlah)
    .slice(0, 10);

  return {
    totals: {
      totalNota: totals.totalNota,
      totalRevenue: totals.totalRevenue,
      totalItems: totals.totalItems,
      totalCustomers: totals.uniqueCustomers.size,
    },
    topProducts,
  };
};

export default computeDashboardSummary;
