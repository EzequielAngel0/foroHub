import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../context/notification-context';
import api from '../services/api';
import getApiErrorMessage from '../services/getApiErrorMessage';

const RegisterTopic = () => {
  const [formData, setFormData] = useState({ titulo: '', mensaje: '', curso: '' });
  const [cursos, setCursos] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const notify = useContext(NotificationContext);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get('/cursos');
        setCursos(response.data.content || response.data || []);
      } catch (err) {
        notify.error(getApiErrorMessage(err, 'No fue posible cargar cursos'));
      } finally {
        setLoadingCursos(false);
      }
    };
    fetchCursos();
  }, [notify]);

  const messageCount = useMemo(() => formData.mensaje.length, [formData.mensaje]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await api.post('/topicos', {
        titulo: formData.titulo,
        mensaje: formData.mensaje,
        idCurso: Number(formData.curso),
      });
      notify.success('Topico creado');
      navigate('/topicos');
    } catch (err) {
      setError(getApiErrorMessage(err, 'No fue posible crear el topico'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <button className="link-btn" onClick={() => navigate('/topicos')}>
        Volver al listado
      </button>

      <div className="panel p-6 md:p-8">
        <h1 className="title-display hero-title">Crear Topico</h1>
        <p className="subtitle mt-1 mb-5">Publica una nueva consulta para la comunidad</p>

        {error && (
          <div className="mb-5 rounded-xl border border-[#e9b4b1] bg-[#fff1f0] px-4 py-3 text-sm text-[#8c2e2e]">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="field-label">Titulo</label>
            <input
              type="text"
              className="input"
              placeholder="Resumen breve y claro"
              maxLength={100}
              value={formData.titulo}
              onChange={(e) => setFormData((prev) => ({ ...prev, titulo: e.target.value }))}
              required
            />
            <p className="text-xs muted mt-1">{formData.titulo.length}/100</p>
          </div>

          <div>
            <label className="field-label">Mensaje</label>
            <textarea
              className="textarea"
              placeholder="Describe el contexto y lo que intentaste"
              maxLength={255}
              value={formData.mensaje}
              onChange={(e) => setFormData((prev) => ({ ...prev, mensaje: e.target.value }))}
              required
            />
            <p className="text-xs muted mt-1">{messageCount}/255</p>
          </div>

          <div>
            <label className="field-label">Curso</label>
            {loadingCursos ? (
              <div className="skeleton h-11 w-full" />
            ) : (
              <select
                className="select"
                value={formData.curso}
                onChange={(e) => setFormData((prev) => ({ ...prev, curso: e.target.value }))}
                required
              >
                <option value="">Selecciona un curso</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nombre} - {curso.categoria}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button type="button" className="btn btn-secondary sm:flex-1" onClick={() => navigate('/topicos')}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary sm:flex-1" disabled={isSubmitting || loadingCursos}>
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterTopic;

