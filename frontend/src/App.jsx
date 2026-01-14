import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Customer from './pages/Customer.jsx';
import Dashboard from './pages/Dashboard.jsx';
import HistoryNota from './pages/HistoryNota.jsx';
import Login from './pages/Login.jsx';
import Nota from './pages/Nota.jsx';
import Barang from './pages/Barang.jsx';
import Profile from './pages/Profile.jsx';
import { ToastProvider } from './lib/toast.jsx';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const titleMap = {
      '/': 'Login',
      '/dashboard': 'Dashboard',
      '/barang': 'Data Barang',
      '/customer': 'Data Customer',
      '/nota': 'Buat Nota',
      '/nota/history': 'History Nota',
      '/profile': 'Profile',
    };
    const pageTitle = titleMap[location.pathname] || 'Sistem Toko';
    document.title = `${pageTitle} | Sistem Toko`;
  }, [location.pathname]);

  return null;
};

const App = () => (
  <>
    <TitleUpdater />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/customer"
        element={
          <RequireAuth>
            <Customer />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/barang"
        element={
          <RequireAuth>
            <Barang />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/nota"
        element={
          <RequireAuth>
            <Nota />
          </RequireAuth>
        }
      />
      <Route
        path="/nota/history"
        element={
          <RequireAuth>
            <HistoryNota />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <ToastProvider />
  </>
);

export default App;
