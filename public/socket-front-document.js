import { alertarERedirecionar, atualizaTextoEditor } from "./documento.js";

const socket = io();

function selecionarDocumento(nomeDocumento) {
  socket.emit('selecionar_documento', nomeDocumento, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(dados) {
  socket.emit('texto_editor', dados);
}

function emitirExcluirDocumento(nomeDocumento) {
  socket.emit('excluir_documento', nomeDocumento);
}

socket.on('texto_editor_clientes', (texto) => {
  atualizaTextoEditor(texto);
});

socket.on('excluir_documento_interface', (nomeDocumento) => {
  alertarERedirecionar(nomeDocumento);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };