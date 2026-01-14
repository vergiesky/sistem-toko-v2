import NotaReceiptPage from './NotaReceiptPage.jsx';

const NotaPrintPage = ({
  pageItems,
  pageTotal,
  notaNumber,
  customerName,
  date,
  getItemProduct,
  getItemUnitPrice,
  blankRows = 0,
}) => {
  const rows = pageItems.map((item) => {
    const product = getItemProduct(item);
    const unitPrice = getItemUnitPrice(item);
    const jumlah = Number(item.jumlah) || 0;
    return {
      key: item.id,
      qty: jumlah,
      name: product?.nama_barang || '',
      price: unitPrice,
      subtotal: jumlah * unitPrice,
    };
  });

  return (
    <div className="rounded-3xl border border-[#f0e1d4] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)] relative overflow-hidden print:mt-0 print:rounded-none print:border-0 print:shadow-none print:p-0">
      <NotaReceiptPage
        notaNumber={notaNumber}
        date={date}
        customerName={customerName}
        rows={rows}
        pageTotal={pageTotal}
        blankRows={blankRows}
      />
    </div>
  );
};

export default NotaPrintPage;
