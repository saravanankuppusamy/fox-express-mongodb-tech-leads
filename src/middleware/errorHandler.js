export function errorHandler(err, req, res, next) {
  res.type('application/problem+json');

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      type: 'https://fox.example/errors/validation',
      title: 'Validation Failed',
      status: 400,
      detail: Object.values(err.errors).map(e => e.message).join(', ')
    });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({
      type: 'https://fox.example/errors/invalid-id',
      title: 'Invalid ID Format',
      status: 400
    });
  }
  if (err.code === 11000) {
    return res.status(409).json({
      type: 'https://fox.example/errors/duplicate',
      title: 'Duplicate Key',
      status: 409
    });
  }

  console.error(err.stack);
  res.status(500).json({
    type: 'https://fox.example/errors/server',
    title: 'Internal Server Error',
    status: 500
  });
}
