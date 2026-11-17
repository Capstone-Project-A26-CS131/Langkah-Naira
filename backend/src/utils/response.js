const successResponse = (res, message, data = null, statusCode = 200) => {
  const payload = { success: true, message };
  if (data !== null) payload.data = data;
  return res.status(statusCode).json(payload);
};

const paginatedResponse = (res, message, data, pagination) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  });
};

const errorResponse = (res, message, errorCode = 'BAD_REQUEST', statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    error: errorCode,
    message,
  });
};

const validationErrorResponse = (res, details) => {
  return res.status(400).json({
    success: false,
    error: 'VALIDATION_ERROR',
    message: 'Data yang dikirim tidak valid.',
    details,
  });
};

module.exports = {
  successResponse,
  paginatedResponse,
  errorResponse,
  validationErrorResponse,
};
