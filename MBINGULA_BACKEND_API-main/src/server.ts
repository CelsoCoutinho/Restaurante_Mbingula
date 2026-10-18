import express from "express";
import { router } from "./router";
import cors from 'cors'
import path from 'path';

const logger = require('pino-http')

const app = express();

app.use(logger());
app.use(cors());
app.use(express.json());
app.use(router);

app.use("/images", express.static(path.join(__dirname, "..", "uploads")));

app.listen(3000, () => console.log("Servidor iniciou"))

export default app;