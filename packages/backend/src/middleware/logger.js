import morgan from 'morgan';

export default function loggerMiddleware(logger) {
  return morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  });
}
