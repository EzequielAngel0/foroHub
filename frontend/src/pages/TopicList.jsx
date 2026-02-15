import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { NotificationContext } from '../context/notification-context';
import { ConfirmDialogContext } from '../context/confirm-dialog-context';
import api from '../services/api';
import getApiErrorMessage from '../services/getApiErrorMessage';

const statusMap = {
  NO_RESPONDIDO: { label: 'Pendiente', className: 'status-pending' },
  NO_SOLUCIONADO: { label: 'No resuelto', className: 'status-danger' },
  SOLUCIONADO: { label: 'Solucionado', className: 'status-solved' },
  CERRADO: { label: 'Cerrado', className: 'status-closed' },
};

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const notify = useContext(NotificationContext);
  const { confirm } = useContext(ConfirmDialogContext);

  const fetchTopics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/topicos');
      setTopics(response.data.content || response.data || []);
    } catch (error) {
      notify.error(getApiErrorMessage(error, 'No se pudieron cargar los topicos'));
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const filteredTopics = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return topics;
    return topics.filter((topic) => {
      const haystack = `${topic.titulo} ${topic.mensaje} ${topic.autor || ''} ${topic.curso || ''}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [topics, searchTerm]);

  const handleDelete = useCallback(
    async (id) => {
      const accepted = await confirm({
        title: 'Eliminar topico',
        message: 'Seguro que quieres eliminar este topico? Esta accion no se puede deshacer.',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        variant: 'danger',
      });
      if (!accepted) return;
      try {
        await api.delete(`/topicos/${id}`);
        notify.success('Topico eliminado');
        setTopics((prev) => prev.filter((topic) => topic.id !== id));
      } catch (error) {
        notify.error(getApiErrorMessage(error, 'No se pudo eliminar el topico'));
      }
    },
    [confirm, notify]
  );

  return (
    <section className="space-y-5">
      <div className="panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="chip mb-2">Dashboard</p>
            <h1 className="title-display hero-title">Topicos Activos</h1>
            <p className="subtitle mt-1">
              {loading ? 'Cargando...' : `${filteredTopics.length} resultados en la conversacion`}
            </p>
          </div>
          <Link to="/crear-topico" className="btn btn-primary text-center">
            Crear topico
          </Link>
        </div>

        <div className="divider my-5" />

        <label className="field-label">Buscar</label>
        <input
          className="input"
          placeholder="Titulo, mensaje, autor o curso"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="card p-5">
              <div className="skeleton h-5 w-28 mb-3" />
              <div className="skeleton h-4 w-full mb-2" />
              <div className="skeleton h-4 w-10/12 mb-4" />
              <div className="skeleton h-4 w-8/12" />
            </div>
          ))}
        </div>
      )}

      {!loading && filteredTopics.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => {
            const status = statusMap[topic.status] || statusMap.NO_RESPONDIDO;
            return (
              <article key={topic.id} className="card p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className={`status-badge ${status.className}`}>{status.label}</span>
                  <span className="text-xs muted">{formatDate(topic.fechaCreacion)}</span>
                </div>

                <Link to={`/topicos/${topic.id}`} className="mb-2">
                  <h2 className="text-xl font-semibold text-[#292520] truncate-2">{topic.titulo}</h2>
                </Link>

                <p className="subtitle text-sm truncate-3 mb-3">{topic.mensaje}</p>

                <div className="text-xs muted mb-4">
                  <span>{topic.autor || 'Anonimo'}</span> · <span>{topic.curso || 'Sin curso'}</span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2">
                  <Link to={`/editar-topico/${topic.id}`} className="btn btn-secondary text-center w-full">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(topic.id)} className="btn btn-danger w-full">
                    Eliminar
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {!loading && filteredTopics.length === 0 && (
        <div className="panel p-8 text-center">
          <h3 className="title-display text-4xl text-[#3b332b] mb-2">{searchTerm ? 'Sin resultados' : 'Sin topicos'}</h3>
          <p className="subtitle mb-4">
            {searchTerm ? 'Prueba con otro termino de busqueda' : 'Aun no hay publicaciones en este foro'}
          </p>
          {!searchTerm && (
            <Link to="/crear-topico" className="btn btn-primary inline-block">
              Publicar el primero
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

export default TopicList;

