import { useState } from 'react';

const useNotaHistoryFilters = () => {
  const [query, setQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [draftDateFrom, setDraftDateFrom] = useState('');
  const [draftDateTo, setDraftDateTo] = useState('');

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
    toggleFilter,
    applyFilter,
    cancelFilter,
    resetFilter,
  };
};

export default useNotaHistoryFilters;
