import { useContext, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

const navItems = [
  { to: '/topicos', label: 'Topicos' },
  { to: '/crear-topico', label: 'Nuevo' },
];

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/registro';
  const initials = useMemo(() => (user?.nombre || user?.email || 'U').charAt(0).toUpperCase(), [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMenu = () => setMobileOpen(false);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="page-wrap flex items-center justify-between gap-3 py-3">
          <Link to="/topicos" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="brand-block">FH</div>
            <div>
              <p className="title-display text-2xl text-[#332d27]">ForoHub</p>
              <p className="text-xs subtitle">Comunidad tecnica</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`btn ${active ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#2f2b26] text-[#f8f3ea] flex items-center justify-center text-sm font-semibold">
              {initials}
            </div>
            <span className="text-sm muted max-w-[180px] truncate">{user?.nombre || user?.email || 'Usuario'}</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Salir
            </button>
          </div>

          <button
            className="btn btn-secondary md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            Menu
          </button>
        </div>

        {mobileOpen && (
          <div className="page-wrap md:hidden pb-4">
            <div className="panel p-3 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2f2b26] text-[#f8f3ea] flex items-center justify-center text-xs font-semibold">
                  {initials}
                </div>
                <span className="text-sm muted">{user?.nombre || user?.email || 'Usuario'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link key={item.to} to={item.to} className="btn btn-secondary text-center" onClick={closeMenu}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <button onClick={handleLogout} className="btn btn-danger w-full">
                Cerrar sesion
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="page-wrap py-6">{children}</main>
    </div>
  );
};

export default Layout;

