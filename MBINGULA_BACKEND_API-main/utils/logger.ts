import { createLogger, transports, format, Logger } from 'winston';
import { format as fmt } from 'winston';
import fs from 'fs';

const customTimestampFormat = format((info) => {
    const timestamp = new Date(info.timestamp);
    const day = String(timestamp.getDate()).padStart(2, '0');
    const month = String(timestamp.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = timestamp.getFullYear();
    const hours = String(timestamp.getHours()).padStart(2, '0');
    const minutes = String(timestamp.getMinutes()).padStart(2, '0');
    const seconds = String(timestamp.getSeconds()).padStart(2, '0');
    info.timestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return info;
});

const customJsonFormat = fmt.printf(({ level, message, nome_utilizador, numero_telefone, timestamp }) => {
    return JSON.stringify({
        level,
        message,
        nome_utilizador,
        numero_telefone,
        timestamp
    });
});

const arrayFormat = fmt.printf(({ level, message, nome_utilizador, numero_telefone, timestamp }) => {
    const entry = JSON.stringify({
        level,
        message,
        nome_utilizador,
        numero_telefone,
        timestamp
    });

    const filePath = 'logs/logs_inicio_sessao.json';

    let fileContent = '[]';
    try {
        if (fs.existsSync(filePath)) {
            fileContent = fs.readFileSync(filePath, 'utf8');
        }
    } catch (e) {
        console.error('Error reading log file:', e);
    }

    let logs = [];
    try {
        logs = JSON.parse(fileContent);
        if (!Array.isArray(logs)) {
            logs = [];
        }
    } catch (e) {
        logs = [];
    }

    logs.push(JSON.parse(entry));

    try {
        fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
    } catch (e) {
        console.error('Error writing log file:', e);
    }

    return '';
});

const logger: Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        customTimestampFormat(),
        customJsonFormat
    ),
    transports: [
        new transports.File({
            filename: 'logs/logs_inicio_sessao.json',
            format: arrayFormat
        }),
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
        }),
    ],
});

export default logger;