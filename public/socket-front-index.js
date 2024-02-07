import { inserirLinkDocumento, removerLinkDocumento } from './index.js';

const socket = io();

socket.emit('obter-documentos', (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nomeDocumento) {
  socket.emit('adicionar-documento', nomeDocumento);
}

socket.on('adicionar_documento_interface', (nomeDocumento) => {
  inserirLinkDocumento(nomeDocumento);
});

socket.on('documento_existente', (nomeDocumento) => {
  alert(`O documento ${nomeDocumento} já existe!`);
});

socket.on('excluir_documento_interface', (nomeDocumento) => {
  removerLinkDocumento(nomeDocumento);
});

export { emitirAdicionarDocumento };