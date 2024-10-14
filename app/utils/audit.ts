import fs from "fs";
import path from "path";

const AUDIT_LOG_PATH = path.join(process.cwd(), "audit.log");

export function logAudit(userId: string, command: string, result: string) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - User: ${userId}, Command: ${command}, Result: ${result}\n`;

  fs.appendFileSync(AUDIT_LOG_PATH, logEntry);
}