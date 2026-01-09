import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  constructor(config = {}) {
    this.level = config.level || 'info';
    this.toFile = config.toFile || false;
    this.logDir = path.join(__dirname, '../../logs');

    if (this.toFile) {
      this.ensureLogDirectory();
    }
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  shouldLog(level) {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.level];
  }

  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const levelStr = level.toUpperCase().padEnd(5);
    let msg = `[${timestamp}] [${levelStr}] ${message}`;

    if (data) {
      msg += `\n${JSON.stringify(data, null, 2)}`;
    }

    return msg;
  }

  writeToFile(message) {
    if (!this.toFile) return;

    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(this.logDir, `${date}.log`);

    fs.appendFileSync(logFile, message + '\n', 'utf8');
  }

  log(level, message, data = null) {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, data);

    // 콘솔 출력 (색상 적용)
    const colors = {
      debug: '\x1b[36m', // cyan
      info: '\x1b[32m', // green
      warn: '\x1b[33m', // yellow
      error: '\x1b[31m', // red
    };
    const reset = '\x1b[0m';

    console.log(`${colors[level]}${formattedMessage}${reset}`);

    // 파일 출력
    this.writeToFile(formattedMessage);
  }

  debug(message, data = null) {
    this.log('debug', message, data);
  }

  info(message, data = null) {
    this.log('info', message, data);
  }

  warn(message, data = null) {
    this.log('warn', message, data);
  }

  error(message, data = null) {
    this.log('error', message, data);
  }
}

export default Logger;
