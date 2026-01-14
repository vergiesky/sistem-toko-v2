const splitIntoPages = (list, size) => {
  if (!Array.isArray(list) || size <= 0) return [];
  const pages = [];
  for (let i = 0; i < list.length; i += size) {
    pages.push(list.slice(i, i + size));
  }
  return pages;
};

export default splitIntoPages;
