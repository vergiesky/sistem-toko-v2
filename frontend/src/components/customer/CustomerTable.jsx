import { Pencil, Trash2 } from 'lucide-react';

const CustomerTable = ({
  isLoading,
  customers,
  page,
  pageSize,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-[#fff9f3] text-[#7a6151]">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">No</th>
            <th className="px-6 py-3 text-left font-semibold">
              Nama Customer
            </th>
            <th className="px-6 py-3 text-left font-semibold">
              Perusahaan
            </th>
            <th className="px-6 py-3 text-left font-semibold">
              Alamat
            </th>
            <th className="px-6 py-3 text-center font-semibold">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f3e6db]">
          {isLoading ? (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-8 text-center text-[#9a8678]"
              >
                Memuat data customer...
              </td>
            </tr>
          ) : customers.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-8 text-center text-[#9a8678]"
              >
                Belum ada data customer
              </td>
            </tr>
          ) : (
            customers.map((customer, index) => (
              <tr
                key={customer.id_customer}
                className="text-[#3d2d24] hover:bg-[#fff9f3]"
              >
                <td className="px-6 py-2.5">
                  {(page - 1) * pageSize + index + 1}
                </td>
                <td className="px-6 py-2.5 font-semibold text-[#3f2b20]">
                  {customer.nama_customer}
                </td>
                <td className="px-6 py-2.5">
                  {customer.nama_perusahaan}
                </td>
                <td className="px-6 py-2.5">{customer.alamat}</td>
                <td className="px-6 py-2.5 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(customer)}
                      className="rounded-full p-2 text-[#f2780c] transition hover:bg-[#fff1e5]"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(customer)}
                      className="rounded-full p-2 text-[#e25822] transition hover:bg-[#fee7dd]"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
