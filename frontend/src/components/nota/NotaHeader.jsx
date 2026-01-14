import { Phone } from 'lucide-react';
import CustomerAutocomplete from './CustomerAutocomplete.jsx';

const NotaHeader = ({
  notaNumber,
  date,
  customerName = '',
  mode = 'screen',
  customerAutocompleteProps,
}) => {
  const isPrint = mode === 'print';

  return (
    <div className="flex flex-wrap items-start justify-between gap-6 print-header">
      <div className="flex flex-col gap-0 print-header-left">
        <div className="flex items-center gap-0 -ml-3">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-28 w-28 object-contain print-logo"
          />
          <div className="print-company-section -ml-3">
            <div className="text-center print-company-info">
              <h3 className="text-xl font-semibold text-[#d24b1f] text-center">
                SURYA GEMILANG
              </h3>
              <p className="text-sm text-[#7a6151] text-center">
                Toko alat listrik & elektronik
              </p>
              <p className="text-sm text-[#7a6151] text-center">
                Depan Pasar Limpung
              </p>
              <p className="text-sm text-[#7a6151] text-center">
                Jln. Diponegoro 51271
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-sm text-[#3d2d24]">
          <div className="flex flex-wrap items-center gap-4 print-contact">
            <div className="flex items-center gap-2 print-contact-item">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-[#f2780c]"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 0 0-8.54 15.22L2 22l4.93-1.46A10 10 0 1 0 12 2zm0 1.8a8.2 8.2 0 1 1-4.19 15.29l-.29-.17-2.88.85.86-2.8-.18-.3A8.2 8.2 0 0 1 12 3.8zm-3.02 4.5c-.16 0-.43.07-.65.3-.2.2-.74.72-.74 1.76s.76 2.03.87 2.18c.11.15 1.49 2.38 3.68 3.25 1.82.73 2.19.59 2.58.55.4-.05 1.3-.52 1.48-1.03.18-.5.18-.94.13-1.04-.05-.1-.18-.15-.38-.25s-1.2-.6-1.38-.67-.32-.1-.46.1c-.13.2-.52.66-.64.8-.12.14-.24.16-.44.06-.2-.1-.86-.33-1.63-1.06-.6-.56-1-1.25-1.12-1.46-.12-.2-.01-.31.09-.41.1-.1.2-.26.3-.39.1-.13.13-.22.2-.36.06-.15.03-.28-.02-.39-.05-.1-.45-1.15-.63-1.58-.16-.4-.33-.35-.45-.35z"
                />
              </svg>
              <span>0821 6555 5606</span>
            </div>
            <div className="flex items-center gap-2 print-contact-item">
              <Phone size={18} className="text-[#f2780c]" />
              <span>0285 4468 550</span>
            </div>
          </div>
          <div className="text-sm font-semibold text-[#3d2d24] print-nota-number">
            NOTA NO :{' '}
            <span className="inline-block border-b border-[#6f5a4a] px-2">
              {String(notaNumber).padStart(3, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm text-[#3d2d24] min-w-[240px] print-header-right">
        <div className="flex items-center justify-between gap-3 print-date-section">
          <span className="font-semibold print-date-label">Tanggal</span>
          <span className="rounded-lg border border-[#f0e1d4] bg-[#fff9f3] px-3 py-1.5 print-date-value">
            {date}
          </span>
        </div>
        <div className="relative print-customer-section">
          <label className="text-xs font-semibold text-[#7a6151] print-customer-label">
            Kepada Yth.
          </label>
          {isPrint ? (
            <div className="relative mt-2">
              <span className="rounded-lg border border-[#f0e1d4] bg-[#fff9f3] px-3 py-1.5 text-sm text-[#3d2d24] print-customer-name">
                {customerName}
              </span>
            </div>
          ) : (
            <CustomerAutocomplete {...customerAutocompleteProps} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotaHeader;
