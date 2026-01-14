const TopProductsCard = ({ isLoading, topProducts }) => (
  <div className="mt-6 rounded-2xl border border-[#f0e1d4] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)]">
    <div>
      <h3 className="text-xl font-semibold text-[#3f2b20]">
        Top 10 Barang Terjual
      </h3>
      <p className="text-sm text-[#7a6151]">Berdasarkan jumlah penjualan</p>
    </div>
    <div className="mt-4">
      {isLoading ? (
        <div className="flex h-48 items-center justify-center text-sm text-[#9a8678]">
          Memuat data...
        </div>
      ) : topProducts.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-sm text-[#9a8678]">
          Belum ada data penjualan
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#f0e1d4]">
          <table className="min-w-full text-sm">
            <thead className="bg-[#fff9f3] text-[#7a6151]">
              <tr>
                <th className="pl-6 pr-2 py-3 text-left font-semibold">
                  Ranking
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Nama Barang
                </th>
                <th className="pl-2 pr-6 py-3 text-right font-semibold">
                  Jumlah Terjual
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3e6db]">
              {topProducts.map((item, index) => (
                <tr key={item.name}>
                  <td className="pl-6 pr-2 py-2.5 text-left">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#fff1e5] text-sm font-semibold text-[#f2780c]">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-semibold text-[#3f2b20]">
                    {item.name}
                  </td>
                  <td className="pl-2 pr-6 py-2.5 text-right font-semibold text-[#3f2b20]">
                    {item.jumlah}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

export default TopProductsCard;
