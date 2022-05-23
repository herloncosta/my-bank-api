import express from "express";
import winston from "winston";
import accountsRouter from "./routes/account.routes.js";
import { promises as fs } from "fs";
import cors from "cors";

const { writeFile, readFile } = fs;

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/accounts", accountsRouter);

// global logger
const { combine, label, printf, timestamp } = winston.format;
const bankLog = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/my-bank-app.log" }),
    ],
    format: combine(label({ label: "my-bank-api" }), timestamp(), bankLog),
});

// initialize server
app.listen(5000, async () => {
    try {
        await readFile(global.fileName);
        logger.info("API Started.");
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: [],
        };

        writeFile(global.fileName, JSON.stringify(initialJson))
            .then(() => logger.info("API Started and File Created."))
            .catch((err) => logger.error(err));
    }
});
