import { BarChart3, Package, RefreshCw, TrendingUp, Users } from 'lucide-react';
import { useMemo } from 'react';
import SalesTrendCard from '../components/dashboard/SalesTrendCard.jsx';
import Sidebar from '../components/Sidebar.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import TopProductsCard from '../components/dashboard/TopProductsCard.jsx';
import useNotas from '../hooks/dashboard/useNotas.js';
import computeDashboardSummary from '../lib/dashboard/computeDashboardSummary.js';
import computeMonthlyRevenue from '../lib/dashboard/computeMonthlyRevenue.js';
import formatRupiah from '../lib/formatRupiah.js';

const Dashboard = () => {
  const { notas, isLoading, isRefreshing, errorMessage, fetchNotas } =
    useNotas();

  const summary = useMemo(() => computeDashboardSummary(notas), [notas]);

  const monthlyRevenue = useMemo(
    () => computeMonthlyRevenue(notas, 6),
    [notas],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_70%_-10%,#fff3e8_0%,#fff7f0_35%,#fffdfb_100%)] text-[#3d2d24]">
      <div className="flex min-h-screen w-full flex-col md:flex-row md:flex-wrap">
        <Sidebar />

        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#3f2b20]">
                Dashboard
              </h2>
            </div>
            <button
              type="button"
              onClick={fetchNotas}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#f0e1d4] bg-white px-4 py-2.5 text-sm font-semibold text-[#3d2d24] shadow-sm transition hover:bg-[#fff9f3] sm:w-auto"
            >
              <RefreshCw
                size={16}
                className={isRefreshing ? 'animate-spin' : ''}
              />
              Muat ulang
            </button>
          </div>

          {errorMessage && (
            <div className="mt-4 rounded-2xl border border-[#f4c7b6] bg-[#fff1ea] px-4 py-3 text-sm text-[#9a3412]">
              {errorMessage}
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={BarChart3}
              label="Total Nota"
              value={summary.totals.totalNota}
              accent="bg-[#f2780c]"
            />
            <StatCard
              icon={TrendingUp}
              label="Total Omzet"
              value={formatRupiah(summary.totals.totalRevenue)}
              accent="bg-[#2563eb]"
            />
            <StatCard
              icon={Users}
              label="Total Customer"
              value={summary.totals.totalCustomers}
              accent="bg-[#16a34a]"
            />
            <StatCard
              icon={Package}
              label="Total Barang Terjual"
              value={summary.totals.totalItems}
              accent="bg-[#f59e0b]"
            />
          </div>

          <div className="mt-6">
            <SalesTrendCard
              isLoading={isLoading}
              monthlyRevenue={monthlyRevenue}
            />

            <TopProductsCard
              isLoading={isLoading}
              topProducts={summary.topProducts}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
