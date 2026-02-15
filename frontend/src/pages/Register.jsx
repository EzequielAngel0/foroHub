import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationContext } from '../context/notification-context';
import api from '../services/api';
import getApiErrorMessage from '../services/getApiErrorMessage';

const Register = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', clave: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const notify = useContext(NotificationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await api.post('/login/registro', formData);
      notify.success('Cuenta creada. Ahora puedes iniciar sesion');
      navigate('/login');
    } catch (err) {
      setError(getApiErrorMessage(err, 'No fue posible registrar el usuario'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-shell">
      <div className="panel auth-card">
        <div className="auth-accent">FH</div>
        <h1 className="title-display text-center hero-title">Crear Cuenta</h1>
        <p className="subtitle text-center mt-2 mb-6">Registrate para abrir y resolver topicos</p>

        {error && (
          <div className="mb-5 rounded-xl border border-[#e9b4b1] bg-[#fff1f0] px-4 py-3 text-sm text-[#8c2e2e]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="field-label">Nombre</label>
            <input
              type="text"
              className="input"
              value={formData.nombre}
              onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="field-label">Correo</label>
            <input
              type="email"
              className="input"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="field-label">Contrasena</label>
            <input
              type="password"
              className="input"
              value={formData.clave}
              onChange={(e) => setFormData((prev) => ({ ...prev, clave: e.target.value }))}
              minLength={6}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-sm subtitle text-center mt-5">
          Ya tienes cuenta?{' '}
          <Link to="/login" className="text-[#935728] font-semibold">
            Ir a login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

