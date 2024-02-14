import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import './db/dbConnect.js';

const app = express();
const porta = process.env.PORTA || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, '../..', 'public');

app.use(express.static(diretorioPublico));

const servidorHttp = http.createServer(app);

servidorHttp.listen(porta, () => {
  console.log(`\x1b[35mServidor rodando em \x1b[34mhttp://localhost:${porta}\x1b[0m`);
});

const io = new Server(servidorHttp);

export default io;