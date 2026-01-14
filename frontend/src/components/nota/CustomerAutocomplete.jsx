import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { filterCustomers } from '../../lib/filterCustomers.js';

const CustomerAutocomplete = ({
  value = '',
  onChange,
  customers = [],
  onSelectCustomer,
  selectedCustomer,
  placeholder = 'Ketik nama customer...',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredCustomers = useMemo(() => {
    if (!value.trim()) return customers;
    return filterCustomers(customers, value);
  }, [customers, value]);

  const handleChange = (event) => {
    const nextValue = event.target.value;
    onChange(nextValue);
    if (selectedCustomer) {
      onSelectCustomer?.(null);
    }
    setIsOpen(true);
  };

  return (
    <div className="relative mt-2">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#c4a38a] print:hidden"
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 120)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#f0e1d4] bg-white py-2 pl-9 pr-3 text-sm text-[#3d2d24] shadow-sm outline-none transition focus:border-[#f59e0b] focus:ring-2 focus:ring-[#fde7b3] print:pl-3 print:text-left print-customer-name print-hide-placeholder"
      />
      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-xl border border-[#f0e1d4] bg-white text-sm shadow-lg">
          {filteredCustomers.length === 0 ? (
            <div className="px-3 py-2 text-[#9a8678]">
              Customer tidak ditemukan
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <button
                key={customer.id_customer}
                type="button"
                onMouseDown={() => {
                  onSelectCustomer?.(customer);
                  onChange(customer.nama_customer ?? '');
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-[#3d2d24] hover:bg-[#fff9f3]"
              >
                {customer.nama_customer}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerAutocomplete;
