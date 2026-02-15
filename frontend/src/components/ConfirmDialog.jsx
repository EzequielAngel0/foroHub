import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConfirmDialogContext } from '../context/confirm-dialog-context';

const defaultOptions = {
  title: 'Confirmar accion',
  message: 'Estas seguro de continuar?',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  variant: 'danger',
};

export const ConfirmDialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState(null);
  const confirmButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const resolverRef = useRef(null);

  const closeDialog = useCallback((result) => {
    if (resolverRef.current) {
      resolverRef.current(result);
      resolverRef.current = null;
    }
    setDialog(null);
  }, []);

  const confirm = useCallback((options = {}) => {
    const merged = { ...defaultOptions, ...options };
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setDialog(merged);
    });
  }, []);

  useEffect(() => {
    if (!dialog) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog(false);
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        closeDialog(true);
      }
      if (event.key === 'Tab') {
        const focusable = [cancelButtonRef.current, confirmButtonRef.current].filter(Boolean);
        if (!focusable.length) return;

        const currentIndex = focusable.indexOf(document.activeElement);
        let nextIndex = 0;
        if (event.shiftKey) {
          nextIndex = currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1;
        } else {
          nextIndex = currentIndex === focusable.length - 1 ? 0 : currentIndex + 1;
        }
        event.preventDefault();
        focusable[nextIndex].focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    confirmButtonRef.current?.focus();
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [dialog, closeDialog]);

  const value = useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmDialogContext.Provider value={value}>
      {children}
      {dialog && (
        <div className="confirm-overlay" role="presentation" onMouseDown={() => closeDialog(false)}>
          <div
            className="confirm-dialog panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-message"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <p id="confirm-dialog-title" className="confirm-title">
              {dialog.title}
            </p>
            <p id="confirm-dialog-message" className="confirm-message">
              {dialog.message}
            </p>
            <div className="confirm-actions">
              <button ref={cancelButtonRef} className="btn btn-secondary" onClick={() => closeDialog(false)}>
                {dialog.cancelText}
              </button>
              <button
                ref={confirmButtonRef}
                className={`btn ${dialog.variant === 'danger' ? 'btn-danger' : 'btn-primary'}`}
                onClick={() => closeDialog(true)}
              >
                {dialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmDialogContext.Provider>
  );
};
