/**
 * Logger utility with namespace support.
 * Silent by default; enabled by ?debug=1 in URL or `rt:debug` in localStorage.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  ns: string;
  msg: string;
  data?: unknown;
  at: string;
}

const MAX_LOG_HISTORY = 20;
const logHistory: LogEntry[] = [];

function isEnabled(): boolean {
  try {
    if (new URLSearchParams(window.location.search).get('debug') === '1') return true;
    return localStorage.getItem('rt:debug') === '1';
  } catch {
    return false;
  }
}

function record(level: LogLevel, ns: string, msg: string, data?: unknown): void {
  const entry: LogEntry = { level, ns, msg, data, at: new Date().toISOString() };
  logHistory.push(entry);
  if (logHistory.length > MAX_LOG_HISTORY) logHistory.shift();

  if (!isEnabled()) return;

  const prefix = `[${level.toUpperCase()}][${ns}]`;
  if (level === 'error') {
    console.error(prefix, msg, data ?? '');
  } else if (level === 'warn') {
    console.warn(prefix, msg, data ?? '');
  } else {
    console.log(prefix, msg, data ?? '');
  }
}

export const log = {
  debug: (ns: string, msg: string, data?: unknown) => record('debug', ns, msg, data),
  info: (ns: string, msg: string, data?: unknown) => record('info', ns, msg, data),
  warn: (ns: string, msg: string, data?: unknown) => record('warn', ns, msg, data),
  error: (ns: string, msg: string, data?: unknown) => record('error', ns, msg, data),
  getHistory: (): Readonly<LogEntry[]> => [...logHistory],
};
