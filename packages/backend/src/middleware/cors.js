import cors from 'cors';
import config from '../config/default.js';

const corsOptions = {
  origin: config.cors.origin,
  credentials: config.cors.credentials,
  optionsSuccessStatus: 200,
};

export default cors(corsOptions);
