export function filterCustomers(customers, query) {
  const q = query.trim().toLowerCase();
  if (!q) return customers;
  return customers.filter((customer) =>
    String(customer.nama_customer || '').toLowerCase().includes(q),
  );
}
