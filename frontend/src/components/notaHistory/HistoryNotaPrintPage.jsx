import NotaReceiptPage from '../nota/NotaReceiptPage.jsx';
import formatRupiah from '../../lib/formatRupiah.js';

const HistoryNotaPrintPage = ({
  pageDetails,
  pageTotal,
  notaNumber,
  customerName,
  selectedCustomer,
  date,
}) => {
  const rows = pageDetails.map((detail) => ({
    key: detail.id_detail_nota,
    qty: Number(detail.jumlah) || 0,
    name: detail.barang?.nama_barang || '-',
    price: Number(detail.harga_satuan) || 0,
    subtotal: Number(detail.sub_total) || 0,
  }));
  const blankRows = Math.max(0, 15 - pageDetails.length);

  return (
    <div className="rounded-3xl border border-[#f0e1d4] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)] relative overflow-hidden print:mt-0 print:rounded-none print:border-0 print:shadow-none print:p-0">
      <NotaReceiptPage
        notaNumber={notaNumber}
        date={date}
        customerName={customerName}
        selectedCustomer={selectedCustomer}
        rows={rows}
        pageTotal={pageTotal}
        blankRows={blankRows}
        formatRupiah={formatRupiah}
      />
    </div>
  );
};

export default HistoryNotaPrintPage;
