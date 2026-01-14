import { useEffect, useMemo, useState } from 'react';

const useNotaHistoryPaging = ({
  filteredNotas,
  pageSize = 10,
  resetKeys = [],
}) => {
  const [page, setPage] = useState(1);
  const totalItems = filteredNotas.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const resetSignature = useMemo(() => JSON.stringify(resetKeys), [resetKeys]);
  const pagedNotas = useMemo(
    () =>
      filteredNotas.slice(
        (safePage - 1) * pageSize,
        safePage * pageSize,
      ),
    [filteredNotas, safePage, pageSize],
  );

  useEffect(() => {
    if (page > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [resetSignature]);

  return {
    page: safePage,
    setPage,
    totalItems,
    totalPages,
    pagedNotas,
  };
};

export default useNotaHistoryPaging;
