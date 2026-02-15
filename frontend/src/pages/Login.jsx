import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { NotificationContext } from '../context/notification-context';

const Login = () => {
  const getInitialError = () => {
    const authMessage = sessionStorage.getItem('auth_error_message');
    if (authMessage) {
      sessionStorage.removeItem('auth_error_message');
      return authMessage;
    }
    return '';
  };

  const [loginData, setLoginData] = useState({ login: '', clave: '' });
  const [error, setError] = useState(getInitialError);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const notify = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(loginData.login, loginData.clave);
    setIsLoading(false);

    if (result.success) {
      notify.success('Bienvenido de vuelta');
      navigate('/topicos');
      return;
    }
    setError(result.message);
  };

  return (
    <section className="auth-shell">
      <div className="panel auth-card">
        <div className="auth-accent">FH</div>
        <h1 className="title-display text-center hero-title">Iniciar Sesion</h1>
        <p className="subtitle text-center mt-2 mb-6">Accede para participar en la comunidad</p>

        {error && (
          <div className="mb-5 rounded-xl border border-[#e9b4b1] bg-[#fff1f0] px-4 py-3 text-sm text-[#8c2e2e]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="field-label">Correo</label>
            <input
              type="email"
              className="input"
              placeholder="tu@email.com"
              value={loginData.login}
              onChange={(e) => setLoginData((prev) => ({ ...prev, login: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="field-label">Contrasena</label>
            <input
              type="password"
              className="input"
              placeholder="********"
              value={loginData.clave}
              onChange={(e) => setLoginData((prev) => ({ ...prev, clave: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-sm subtitle text-center mt-5">
          No tienes cuenta?{' '}
          <Link to="/registro" className="text-[#935728] font-semibold">
            Crear cuenta
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

