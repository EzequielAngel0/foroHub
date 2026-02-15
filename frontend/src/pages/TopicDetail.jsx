import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

const TopicDetail = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const notify = useContext(NotificationContext);
  const { confirm } = useContext(ConfirmDialogContext);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await api.get(`/topicos/${id}`);
        setTopic(response.data);
      } catch (err) {
        notify.error(getApiErrorMessage(err, 'No fue posible abrir el topico'));
        navigate('/topicos');
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [id, navigate, notify]);

  const handleDelete = useCallback(async () => {
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
      navigate('/topicos');
    } catch (error) {
      notify.error(getApiErrorMessage(error, 'No se pudo eliminar el topico'));
    }
  }, [confirm, id, navigate, notify]);

  const status = useMemo(() => statusMap[topic?.status] || statusMap.NO_RESPONDIDO, [topic]);

  if (loading) {
    return (
      <div className="panel p-6">
        <div className="skeleton h-8 w-1/2 mb-3" />
        <div className="skeleton h-5 w-1/4 mb-5" />
        <div className="skeleton h-40 w-full" />
      </div>
    );
  }

  if (!topic) return null;

  return (
    <section className="space-y-4 max-w-4xl mx-auto">
      <button className="link-btn" onClick={() => navigate('/topicos')}>
        Volver al listado
      </button>

      <article className="panel p-6 md:p-8">
        <div className="flex items-center justify-between gap-2 mb-5">
          <span className={`status-badge ${status.className}`}>{status.label}</span>
          <span className="text-sm muted">{new Date(topic.fechaCreacion).toLocaleDateString('es-MX')}</span>
        </div>

        <h1 className="title-display text-[2.6rem] text-[#332d27] leading-none mb-3">{topic.titulo}</h1>
        <p className="subtitle mb-5">
          Publicado por <strong className="text-[#3a332c]">{topic.autor || 'Anonimo'}</strong> en {topic.curso || 'Sin curso'}
        </p>

        <div className="card p-5 bg-[#fffdf8]">
          <p className="text-base leading-7 text-[#302c27] whitespace-pre-wrap">{topic.mensaje}</p>
        </div>

        <div className="divider my-6" />

        <div className="flex flex-col sm:flex-row gap-2">
          <Link to={`/editar-topico/${id}`} className="btn btn-secondary text-center sm:flex-1">
            Editar
          </Link>
          <button onClick={handleDelete} className="btn btn-danger sm:flex-1">
            Eliminar
          </button>
        </div>
      </article>
    </section>
  );
};

export default TopicDetail;

