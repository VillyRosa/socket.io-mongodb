import { inserirLinkDocumento, removerLinkDocumento } from './index.js';
import { obterCookie } from './utils/cookies.js';

const socket = io('/usuarios', {
  auth: {
    token: obterCookie('tokenJwt'),
  },
});

socket.on('connect_error', (erro) => {
  alert(erro);
  window.location.href = '/login/';
});

socket.emit('obter_documentos', (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nomeDocumento) {
  socket.emit('adicionar_documento', nomeDocumento);
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