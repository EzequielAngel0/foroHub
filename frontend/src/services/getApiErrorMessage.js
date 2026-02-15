const getApiErrorMessage = (error, fallbackMessage) => {
  const apiMessage = error?.response?.data?.message;
  const apiError = error?.response?.data?.error;
  const status = error?.response?.status;
  if (apiMessage || apiError) {
    return apiMessage || apiError;
  }
  if (status === 401) return 'Sesion expirada o token invalido';
  if (status === 403) return 'No tienes permisos para esta accion';
  return fallbackMessage;
};

export default getApiErrorMessage;
