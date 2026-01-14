import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import formatJuta from '../../lib/dashboard/formatJuta.js';
import formatRupiah from '../../lib/formatRupiah.js';

const SalesTrendCard = ({ isLoading, monthlyRevenue }) => (
  <div className="rounded-2xl border border-[#f0e1d4] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(137,95,49,0.35)]">
    <div>
      <h3 className="text-xl font-semibold text-[#3f2b20]">
        Omzet 6 Bulan Terakhir
      </h3>
      <p className="text-sm text-[#7a6151]">
        Periode {monthlyRevenue.rangeLabel}
      </p>
    </div>
    <div className="mt-4 h-72">
      {isLoading ? (
        <div className="flex h-full items-center justify-center text-sm text-[#9a8678]">
          Memuat grafik...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyRevenue.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0e1d4" />
            <XAxis dataKey="label" tick={{ fill: '#6f5a4a' }} />
            <YAxis
              tick={{ fill: '#6f5a4a' }}
              tickFormatter={(value) => formatJuta(value)}
            />
            <Tooltip formatter={(value) => [formatRupiah(value), 'Omzet']} />
            <Legend formatter={() => 'Omzet'} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#f2780c"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  </div>
);

export default SalesTrendCard;
