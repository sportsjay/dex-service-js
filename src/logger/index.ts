import winston, { format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(label({ label: "main" }), timestamp(), myFormat),
  defaultMeta: { service: "main" },
  transports: [new transports.Console()],
});
