import NotaReceiptPage from '../nota/NotaReceiptPage.jsx';

const NotaPreviewPage = ({
  pageDetails,
  notaNumber,
  date,
  customerName,
  pageTotal,
  formatRupiah,
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
    <div className="nota-preview nota-preview-scale">
      <NotaReceiptPage
        notaNumber={notaNumber}
        date={date}
        customerName={customerName}
        rows={rows}
        pageTotal={pageTotal}
        blankRows={blankRows}
        contentClassName="px-5"
        formatRupiah={formatRupiah}
      />
    </div>
  );
};

export default NotaPreviewPage;
