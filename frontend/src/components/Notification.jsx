import { useCallback, useMemo, useRef, useState } from 'react';
import { NotificationContext } from '../context/notification-context';

const toastTitles = {
  success: 'Success',
  error: 'Error',
  info: 'Info',
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const lastNotificationRef = useRef({ message: '', type: '', ts: 0 });

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback((message, type = 'info', duration = 4200) => {
    const now = Date.now();
    const isDuplicate =
      lastNotificationRef.current.message === message &&
      lastNotificationRef.current.type === type &&
      now - lastNotificationRef.current.ts < 1200;

    if (isDuplicate) return;
    lastNotificationRef.current = { message, type, ts: now };

    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => removeNotification(id), duration);
  }, [removeNotification]);

  const notify = useMemo(
    () => ({
      success: (msg) => addNotification(msg, 'success'),
      error: (msg) => addNotification(msg, 'error'),
      info: (msg) => addNotification(msg, 'info'),
    }),
    [addNotification]
  );

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      <div className="toast-stack">
        {notifications.map((notification) => (
          <button
            key={notification.id}
            className={`toast toast-${notification.type} text-left`}
            onClick={() => removeNotification(notification.id)}
            type="button"
          >
            <p className="toast-title">{toastTitles[notification.type]}</p>
            <p className="toast-text">{notification.message}</p>
          </button>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
