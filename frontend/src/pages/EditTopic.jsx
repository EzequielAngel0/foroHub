import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NotificationContext } from '../context/notification-context';
import api from '../services/api';
import getApiErrorMessage from '../services/getApiErrorMessage';

const EditTopic = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ titulo: '', mensaje: '', status: 'NO_RESPONDIDO', idCurso: '' });
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const notify = useContext(NotificationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicRes, coursesRes] = await Promise.all([api.get(`/topicos/${id}`), api.get('/cursos')]);
        const topic = topicRes.data;
        const coursesList = coursesRes.data.content || coursesRes.data || [];
        const currentCourse = coursesList.find((course) => course.nombre === topic.curso);

        setCursos(coursesList);
        setFormData({
          titulo: topic.titulo,
          mensaje: topic.mensaje,
          status: topic.status,
          idCurso: currentCourse ? String(currentCourse.id) : '',
        });
      } catch (err) {
        notify.error(getApiErrorMessage(err, 'No fue posible cargar el topico'));
        navigate('/topicos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate, notify]);

  const messageCount = useMemo(() => formData.mensaje.length, [formData.mensaje]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await api.put(`/topicos/${id}`, {
        titulo: formData.titulo,
        mensaje: formData.mensaje,
        status: formData.status,
        idCurso: Number(formData.idCurso),
      });
      notify.success('Topico actualizado');
      navigate('/topicos');
    } catch (err) {
      setError(getApiErrorMessage(err, 'No fue posible actualizar el topico'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="panel p-6">
        <div className="skeleton h-8 w-1/2 mb-3" />
        <div className="skeleton h-36 w-full" />
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto space-y-4">
      <button className="link-btn" onClick={() => navigate('/topicos')}>
        Volver al listado
      </button>

      <div className="panel p-6 md:p-8">
        <h1 className="title-display hero-title">Editar Topico</h1>
        <p className="subtitle mt-1 mb-5">Ajusta el contenido y estado del topico</p>

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
              value={formData.titulo}
              onChange={(e) => setFormData((prev) => ({ ...prev, titulo: e.target.value }))}
              maxLength={100}
              required
            />
          </div>

          <div>
            <label className="field-label">Mensaje</label>
            <textarea
              className="textarea"
              value={formData.mensaje}
              onChange={(e) => setFormData((prev) => ({ ...prev, mensaje: e.target.value }))}
              maxLength={255}
              required
            />
            <p className="text-xs muted mt-1">{messageCount}/255</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label">Curso</label>
              <select
                className="select"
                value={formData.idCurso}
                onChange={(e) => setFormData((prev) => ({ ...prev, idCurso: e.target.value }))}
                required
              >
                <option value="">Selecciona un curso</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label">Estado</label>
              <select
                className="select"
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              >
                <option value="NO_RESPONDIDO">NO_RESPONDIDO</option>
                <option value="NO_SOLUCIONADO">NO_SOLUCIONADO</option>
                <option value="SOLUCIONADO">SOLUCIONADO</option>
                <option value="CERRADO">CERRADO</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button type="button" className="btn btn-secondary sm:flex-1" onClick={() => navigate('/topicos')}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary sm:flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditTopic;

