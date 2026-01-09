export default function errorHandler(logger) {
  return (err, req, res, next) => {
    logger.error('Express error:', {
      message: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method,
    });

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
      success: false,
      error: {
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    });
  };
}
