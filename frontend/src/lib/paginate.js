import { getPagination } from './pagination.js';

export function paginateItems(items, page, pageSize) {
  const totalItems = items.length;
  const { totalPages } = getPagination(totalItems, page, pageSize);
  const safeTotalPages = Math.max(totalPages, 1);
  const pagedItems = items.slice((page - 1) * pageSize, page * pageSize);

  return { totalItems, totalPages: safeTotalPages, pagedItems };
}
