import { useMemo, useState } from 'react';

const useNotaHistoryFilters = (notas) => {
  const [query, setQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [draftDateFrom, setDraftDateFrom] = useState('');
  const [draftDateTo, setDraftDateTo] = useState('');

  const filteredNotas = useMemo(() => {
    const q = query.trim().toLowerCase();
    const fromTime = dateFrom ? new Date(dateFrom).setHours(0, 0, 0, 0) : null;
    const toTime = dateTo ? new Date(dateTo).setHours(23, 59, 59, 999) : null;

    return notas.filter((nota) => {
      if (q) {
        const name = String(
          nota.customers?.nama_customer || nota.nama_customer || '',
        )
          .toLowerCase()
          .trim();
        const nomor = String(nota.nomor_nota || '').toLowerCase();
        if (!name.includes(q) && !nomor.includes(q)) {
          return false;
        }
      }

      if (fromTime || toTime) {
        const notaDate = new Date(nota.tanggal);
        if (Number.isNaN(notaDate.getTime())) return false;
        const time = notaDate.getTime();
        if (fromTime && time < fromTime) return false;
        if (toTime && time > toTime) return false;
      }

      return true;
    });
  }, [notas, query, dateFrom, dateTo]);

  const toggleFilter = () => {
    if (!isFilterOpen) {
      setDraftDateFrom(dateFrom);
      setDraftDateTo(dateTo);
    }
    setIsFilterOpen((prev) => !prev);
  };

  const applyFilter = () => {
    setDateFrom(draftDateFrom);
    setDateTo(draftDateTo);
    setIsFilterOpen(false);
  };

  const cancelFilter = () => {
    setDraftDateFrom(dateFrom);
    setDraftDateTo(dateTo);
    setIsFilterOpen(false);
  };

  const resetFilter = () => {
    setDraftDateFrom('');
    setDraftDateTo('');
  };

  return {
    query,
    setQuery,
    dateFrom,
    dateTo,
    isFilterOpen,
    draftDateFrom,
    draftDateTo,
    setDraftDateFrom,
    setDraftDateTo,
    filteredNotas,
    toggleFilter,
    applyFilter,
    cancelFilter,
    resetFilter,
  };
};

export default useNotaHistoryFilters;
