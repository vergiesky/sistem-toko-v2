import {
  FileText,
  History,
  Home,
  LogOut,
  Menu,
  Package,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../api/apiAuth.js';
import { getProfile } from '../api/apiUser.js';

const navItems = [
  { label: 'Dashboard', icon: Home, path: '/dashboard' },
  { label: 'Data Barang', icon: Package, path: '/barang' },
  { label: 'Data Customer', icon: Users, path: '/customer' },
  { label: 'Buat Nota', icon: FileText, path: '/nota' },
  { label: 'History Nota', icon: History, path: '/nota/history' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout gagal', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const fetchedUsername = response.data?.username || '';
        setUsername(fetchedUsername);
        if (fetchedUsername) {
          localStorage.setItem('username', fetchedUsername);
        }
      } catch {
        setUsername((prev) => prev || '');
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const initials = useMemo(() => {
    if (!username) return 'U';
    return username
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }, [username]);

  return (
    <>
      <div className="sticky top-0 z-30 w-full bg-[#fff3e8]/90 px-4 py-3 backdrop-blur md:hidden print:hidden">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#f0dccc] bg-white text-[#3d2d24] transition hover:bg-white/80"
            aria-label="Buka menu"
          >
            <Menu size={18} />
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#3d2d24]">Sistem Toko</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f0dccc] bg-white text-sm font-semibold text-[#f2780c] transition hover:bg-white/80"
            aria-label="Buka profile"
          >
            {initials}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col gap-6 border-r border-[#f0dccc] bg-[#fff3e8] px-6 py-8 transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 lg:w-72 print:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-[#f0780c]" >Sistem Toko</h1>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full p-1 text-[#7a6456] transition hover:bg-white/80 md:hidden"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('/profile')}
        className="hidden items-center gap-3 rounded-2xl border border-[#f0dccc] bg-white/80 px-4 py-3 text-left shadow-sm transition hover:bg-white md:flex"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f2780c] text-sm font-semibold text-white">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#3d2d24]">
            {username || 'User'}
          </p>
          <p className="text-xs text-[#7a6456]">Admin</p>
        </div>
      </button>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, icon, path }) => {
          const Icon = icon;
          const isActive = location.pathname === path;
          return (
            <button
              key={label}
              type="button"
              onClick={path ? () => navigate(path) : undefined}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'bg-[#f27910] text-white shadow-[0_12px_28px_-18px_rgba(242,121,16,0.8)]'
                  : 'text-[#3f2f25] hover:bg-white/80'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#f6b982] bg-white/80 px-4 py-3 text-sm font-semibold text-[#3d2d24] transition hover:bg-white"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
